import Blog from "@/models/blog"
import Comment from "@/models/blog"
import { NextResponse } from "next/server"

export const DELETE = async (req, { params }) => {
    const { blogid } = params
    
    try {
        await Blog.deleteOne({ _id: blogid })

        await Comment.deleteMany({ blog: blogid })

        return NextResponse.json({ success: true }, { status: 200 })

    } catch (err) {
        console.log(err.message)
    }
} 