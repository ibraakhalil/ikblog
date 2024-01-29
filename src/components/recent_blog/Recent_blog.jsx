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

    return (
        <div className={styles.recent_blogs}>
            <div className="container">
                <h1>Recent Blog</h1>
                {blogs.map(blog =>
                    <div className={styles.item} key={blog._id} >
                        <div className={styles.thumbnail}>
                            <Image
                                src={defaultThumbnail}
                                fill={true}
                                sizes="300"
                                alt="thumbnail" />
                        </div>
                        <div className={styles.blog}>
                            <Link href={`/blog/${blog._id}`}>
                                <h3>{blog.title}</h3>
                            </Link>
                            <div className={styles.author}>
                                <div className={styles.avatar}>
                                    <Image src={defautlUser} alt="Avatar" width={120} height={120} />
                                    <h4>{blog.author.name}</h4>
                                </div>
                                <div className="author_info">
                                    <p>
                                        {moment(blog.createdAt).fromNow()}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.blog_info}>
                                <p>{blog.body.substring(0, 250)}......</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Recent_blog;