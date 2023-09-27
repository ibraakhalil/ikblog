'use client'
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation"
import style from './page.module.css'
import { useEffect, useState } from "react";
import defautlUser from '../../../../public/user/default.jpg'
import defautlThumbnail from '../../../../public/thumbnail/default.jpg'
import Actions from "@/components/blogAction/Actions";


function Blogsingle() {
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState({})
    const { blogid } = useParams()

    useEffect(() => {
        axios.get(`/api/blog/${blogid}`)
            .then(res => {
                setLoading(false)
                setBlog(res.data)
            })
    }, [blogid])

    return (
        <div className="container">
            {loading && <div className="loading"></div>}
            {!loading && <div className={style.wrapper}>
                <div className={style.blog_info}>
                    <div className={style.thumbnail}>
                        <Image src={defautlThumbnail} fill={true} alt="Thumbnail" />
                    </div>
                    <div className={style.info}>
                        <h2>{blog.title}</h2>
                        <div className={style.author}>
                            <div className={style.avatar}>
                                <Image src={defautlUser} alt="Avatar" width={120} height={120} />
                            </div>
                            <div className="author_info">
                                <h4>Ibrahim Khalil</h4>
                                <p>
                                    01/08/2023
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.blog_body}>
                    {blog.body}
                </div>
                <Actions blog={blog} blogId={blogid} />
            </div>}
        </div>
    );
}


export default Blogsingle;