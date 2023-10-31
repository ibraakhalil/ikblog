"use client"
import style from './page.module.css'
import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from "next-auth/react"
import axios from 'axios';


const CreateBlog = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [thumbnail, setThumbnail] = useState(null)
    const title = useRef('')
    const body = useRef('')
    const router = useRouter()
    const session = useSession()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const blog = {
            title: title.current.value,
            body: body.current.value,
        }

        axios.post('/api/blog', blog)
        .then(res => {
            router.push('/user/profile')
        })
        .catch(err => {
            console.log(err.message)
        })

    }
    const handleChange = (e) => {

    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className={style.blog_form}>
                <div className={style.form_header}>
                    <h1>Create a Blog Post</h1>
                </div>
                <div className={style.form_group}>
                    <input onChange={handleChange} type="file" name="thumbnail" />
                    <div className={style.error_feedback}>
                        {error?.email && <span>{error.email}</span>}
                    </div>
                </div>
                <div className={style.form_group}>
                    <label htmlFor="title">Blog Title:</label>
                    <input ref={title} type="title" name="title" placeholder='Type your title...' />
                    <div className={style.error_feedback}>
                        {error?.password && <span>{error.password}</span>}
                    </div>
                </div>
                <div className={style.form_group}>
                    <label htmlFor="body">Blog Content:</label>
                    <textarea ref={body} name="body" className={style.body} cols="30" rows="10" placeholder='Write your post...'></textarea>
                    <div className={style.error_feedback}>
                        {error?.password && <span>{error.password}</span>}
                    </div>
                </div>
                <button className='btn btn_primary' type="submit" disabled={isLoading ? true : false}>
                    {isLoading ? 'Loading..' : 'Publish'}
                </button>
            </form>
        </div>
    );
}

export default CreateBlog;