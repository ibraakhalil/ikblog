'use client'
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
export const BlogContext = createContext()

const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        axios.get('/api/blog')
            .then(res => {
                setBlogs(res.data.reverse())
            })
            .catch(err => {
                console.log(err.message)
            })
    }, [])

    return (
        <BlogContext.Provider value={blogs}>
            {children}
        </BlogContext.Provider>
    );
}

export default BlogProvider;