import { connect } from '@/config/database'
import { NextResponse } from 'next/server'
import Blog from '@/models/blog'


export const GET = async (req, { params }) => {
    const { blogid } = params

    try {
        await connect() 
        const blog = await Blog.findOne({ _id: blogid })

        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 400 })
        }
        return NextResponse.json(blog, { status: 201 })

    } catch (err) { 
        console.log(err) 
    }
}