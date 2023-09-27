'use client'
import { useContext, useEffect, useState } from "react";
import { BlogContext } from "@/context/BlogContext";
import Recent_blog from "@/components/recent_blog/Recent_blog";

const Page = () => {
    const [loading, setLoading] = useState(false)
    const blogs = useContext(BlogContext)

    return (
        <div className="container">
            <Recent_blog/>
        </div>
    );
}

export default Page;