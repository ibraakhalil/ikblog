'use client'
import axios from 'axios'
import styles from './action.module.css'
import { useParams } from 'next/navigation'
import { useRef, useState } from 'react'
import Comment from '../comment/Comment'


const Actions = ({ blog, blogId }) => {
    const [showCommentInput, setShowCommentInput] = useState(false)
    const [actions, setActions] = useState({
        likes: blog.likes.length,
        dislikes: blog.dislikes.length
    })
    const { blogid } = useParams()

    const onLike = (e) => {
        axios.get(`/api/blog/like/${blogid}`)
            .then(res => {
                setActions(res.data)
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    const onDislike = (e) => {
        axios.get(`/api/blog/dislike/${blogid}`)
            .then(res => {
                setActions(res.data)
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    const onShare = (e) => {
        axios.get('/api/blog/like/:id')
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    const handleComment = (e) => {
        if (showCommentInput) {
            setShowCommentInput(false)
        } else {
            setShowCommentInput(true)
        }
    }

    return (
        <>
            <div className={styles.actions}>
                <ul>
                    <li onClick={onLike}>Like({actions.likes})</li>
                    <li onClick={onDislike}>Dislike({actions.dislikes})</li>
                    <li style={{ "userSelect": "none" }} onClick={handleComment}>Comment</li>
                    <li onClick={onShare}>Share</li>
                </ul>
            </div>
            <Comment blogId={blogid} showCommentInput={showCommentInput} />
        </>
    );
}

export default Actions;