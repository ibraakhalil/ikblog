'use client'
import axios from 'axios'
import styles from './action.module.css'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import Comment from '../comment/Comment'
import { AiFillDislike, AiFillLike } from 'react-icons/ai'
import { useSession } from 'next-auth/react'


const Actions = ({ blog, blogId }) => {
    const { data } = useSession()
    const { blogid } = useParams()
    const [showCommentInput, setShowCommentInput] = useState(false)
    const [actions, setActions] = useState({
        likes: blog.likes,
        dislikes: blog.dislikes
    })



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
        console.log('Share your post!');
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
                    <li onClick={onLike}>
                        <span className={actions.likes.includes(data?.user.id) ? styles.liked : styles.noliked}><AiFillLike /></span>
                        <p>{actions.likes.length}</p>
                    </li>
                    <li onClick={onDislike}>
                        <span className={actions.dislikes.includes(data?.user?.id) ? styles.liked : styles.noliked}><AiFillDislike /> </span>
                        <p>{actions.dislikes.length}</p>
                    </li>
                    <li onClick={handleComment}>Comment</li>
                    <li onClick={onShare}>Share</li>
                </ul>
            </div>
            <Comment blogId={blogid} showCommentInput={showCommentInput} />
        </>
    );
}

export default Actions;