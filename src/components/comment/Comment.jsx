'use client'
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import userImg from '../../../public/user/default.jpg'
import styles from './comment.module.css'
import Replies from "../replies/Replies";


const Comment = ({ blogId, showCommentInput }) => {
    const [comments, setComments] = useState([])
    const [showReply, setShowReply] = useState(false)
    const commentRef = useRef()

    useEffect(() => {
        axios.get(`/api/blog/comment/${blogId}`)
            .then(res => {
                setComments(res.data.reverse())
            })
            .catch(err => {
                console.log('from get comments' + err.message)
            })
    }, [blogId])

    const postComment = (e) => {
        let commentBody = commentRef.current.value;
        axios.post(`/api/blog/comment/${blogId}`, { body: commentBody })
            .then(res => {
                const newComments = [res.data, ...comments]
                setComments(newComments)
                e.target.previousSibling.value = ''
            })
            .catch(err => {
                console.log('From post comment' + err.message)
            })
    }

    const deleteComment = (e) => {
        const commentid = e.target.dataset.commentid
        axios.delete(`/api/blog/delete/comment/${commentid}`)
            .then(res => {
                e.target.parentElement?.parentElement?.parentElement?.remove()
            })
            .catch(e => console.log('From post comment' + e.message))
    }

    const handleShowReply = (e) => {
        let replies = e.target.parentElement?.parentElement?.nextSibling
        if (replies.style.display === 'none') {
            replies.style.display = 'block'
        } else {
            replies.style.display = 'none'
        }
    }

    return (
        <div className="">
            {showCommentInput && <div className={styles.comment_input}>
                <input type="text" name='body' placeholder='Leave a comment' ref={commentRef} />
                <span onClick={postComment}>💦</span>
            </div>}
            <div className="comment">
                {comments.map((comment, i) =>
                    <div className={styles.item} key={i}>
                        <div className={styles.info}>
                            <Image src={userImg} width={80} height={80} alt="user" />
                            <p>{comment.author.name}</p>
                        </div>
                        <div className={styles.body}>
                            <p>{comment.body}</p>
                        </div>
                        <div className={styles.actions}>
                            <ul>
                                <li>Like</li>
                                <li onClick={handleShowReply}>Replies</li>
                                <li onClick={deleteComment} data-commentid={comment._id}>Delete</li>
                                <li>More...</li>
                            </ul>
                        </div>
                        <Replies replies={comment.replies} commentId={comment._id} />
                    </div>)}
            </div>
        </div>
    );
}

export default Comment;