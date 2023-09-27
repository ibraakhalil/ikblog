import { connect } from "@/config/database";
import Blog from "@/models/blog";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async (req) => {
    await connect()
    try {
        const blogs = await Blog.find()
        .populate({
            path: 'author',
            select: ['name', 'profilePic']
        })

        return NextResponse.json(blogs, { status: 200 })

    } catch (err) {
        console.log(err.message)
    }
}

export const POST = async (req) => {
    const {title, body} = await req.json()
    const session = await getServerSession(authOptions)

    const newBlog = new Blog({
        title, body,
        author: session.user.id
    }) 
    try {
        const savedBlog = await newBlog.save()

        return NextResponse.json(savedBlog, { status: 200 })

    } catch (err) {
        console.log(err.message)
    }
}