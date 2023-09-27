'use client'
import { BlogContext } from "@/context/BlogContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import styles from './recent.module.css'
import defaultThumbnail from '../../../public/thumbnail/default.jpg'
import defautlUser from '../../../public/user/default.jpg'
import moment from "moment";


const Recent_blog = () => {
    const blogs = useContext(BlogContext)

    console.log(blogs)

    return (
        <div className={styles.recent_blogs}>
            <h1>Recent Blogs</h1>
            {blogs.map(blog =>
                <div className={styles.item} key={blog._id} >
                    <div className={styles.thumbnail}>
                        <Image
                            src={defaultThumbnail}
                            fill={true}
                            alt="thumbnail" />
                    </div>
                    <div className={styles.blog}>
                        <div className={styles.author}>
                            <div className={styles.avatar}>
                                <Image src={defautlUser} alt="Avatar" width={120} height={120} />
                            </div>
                            <div className="author_info">
                                <h4>{blog.author.name}</h4>
                                <p>
                                    {moment(blog.createdAt).fromNow()}
                                </p>
                            </div>
                        </div>
                        <div className={styles.blog_info}>
                            <h3>{blog.title}</h3>
                            <p>{blog.body.substring(0, 150)}......</p>
                            <div className={styles.read_more}>
                                <Link href={`/blog/${blog._id}`}>
                                    <button className="btn btn_primary">Read More...</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Recent_blog;