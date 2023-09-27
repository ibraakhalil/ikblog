'use client'
import { BlogContext } from "@/context/BlogContext";
import { useContext } from "react";
import styles from './blogs.module.css'
import Image from "next/image";
import defaultThumbnail from '../../../public/thumbnail/default.jpg'
import { useSession } from "next-auth/react";
import Link from "next/link";
import { MdDelete } from 'react-icons/md'
import { BiSolidEdit } from 'react-icons/bi'
import axios from "axios";


const Blogs = () => {
    const { data, status } = useSession()
    const user = data?.user
    const blogs = useContext(BlogContext)
    let myBlogs = blogs.filter((blog) => {
        return blog.author._id === user?.id
    })

    const handleDelete = (e) => {
        const blogid = e.target.dataset.blogid
        console.log(blogid)
        axios.delete(`/api/blog/delete/${blogid}`)
            .then(res => {
                myBlogs.pull()
            })
    }    
    const handleEdit = (e) => {
        const blogid = e.target.dataset.blogid
        axios.post(`/api/blog/edit/${blogid}`)
            .then(res => {
                console.log(res.data)
            })
    }


    return (
        <div className={styles.blogs}>
            <h1>My Posts</h1>
            {status !== 'loading' && <div className={styles.items}>
                {myBlogs.map((blog, i) => {
                    return <div className={styles.item} key={blog._id} >
                        <div className={styles.thumbnail}>
                            <Image
                                src={defaultThumbnail}
                                width={200}
                                height={200}
                                alt="thumbnail" />
                        </div>
                        <div className={styles.blog_info}>
                            <Link href={`/blog/${blog._id}`}>
                                <h3>{blog.title.substring(0, 50)}...</h3>
                            </Link>
                            <p>{blog.body.substring(0, 100)}......</p>
                        </div>
                        <div className={styles.actions}>
                            <ul>
                                <li>
                                    <button 
                                    data-blogid={blog._id} 
                                    onClick={handleDelete}
                                    className={styles.btn}
                                    >
                                        <MdDelete />
                                    </button>
                                </li>
                                <li>
                                <button 
                                    data-blogid={blog._id} 
                                    onClick={handleEdit}
                                    className={styles.btn}
                                    >
                                        <BiSolidEdit />
                                    </button>
                                    
                                </li>
                            </ul>
                        </div>
                    </div>
                })}
            </div>}
        </div>
    );
}

export default Blogs;