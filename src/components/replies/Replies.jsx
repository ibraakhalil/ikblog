import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";
import userImg from '../../../public/user/default.jpg'
import styles from './replies.module.css'

const Replies = ({ replies, commentId }) => {
    const session = useSession()
    const replyRef = useRef()

    const handleReply = (e) => {
        axios.post(`/api/blog/replies/${commentId}`, {
            body: replyRef.current.value,
            author: session.data.user.id
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log('From post reply' + err.message)
            })
    }


    return (
        <>
            <div style={{ "display": 'none' }} className={styles.replies}>
                <div className={styles.reply_input}>
                    <input type="text" ref={replyRef} name="reply" placeholder="Write your reply" />
                    <span onClick={handleReply}>💦</span>
                </div>
                <div>
                    {replies.map((reply, i) => {
                        return <div key={i} className="item">
                            <div className={styles.info}>
                                <Image src={userImg} width={80} height={80} alt="user" />
                                <p>Ibrahim Khalil</p>
                            </div>
                            <div className={styles.body}>
                                <p>{reply.body}</p>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </>
    );
}

export default Replies;