import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import Blog from "@/models/blog";
import Comment from "@/models/comment";

export const GET = async (req, { params }) => {
    const session = await getServerSession(authOptions)
    const [action, blogId, ...other] = params.actions
    const user = session?.user
    try {

        ///////// Like Controller//////////

        if (action === 'like') {
            const blog = await Blog.findOne({ _id: blogId })

            if (blog.likes.includes(user?.id)) {
                const updatedBlog = await Blog.findOneAndUpdate(
                    { _id: blogId },
                    { "$pull": { "likes": user?.id } },
                    { 'new': true }
                )
                return NextResponse.json({
                    likes: updatedBlog.likes,
                    dislikes: updatedBlog.dislikes,
                }, { status: 200 })
            }

            const updatedBlog = await Blog.findOneAndUpdate(
                { _id: blogId },
                { "$push": { "likes": user?.id } },
                { 'new': true }
            )

            return NextResponse.json({
                likes: updatedBlog.likes,
                dislikes: updatedBlog.dislikes,
            }, { status: 200 })
        }

        ///////// Dislike Controller//////////

        if (action === 'dislike') {
            const blog = await Blog.findOne({ _id: blogId })

            if (blog.dislikes.includes(user?.id)) {
                const updatedBlog = await Blog.findOneAndUpdate(
                    { _id: blogId },
                    { "$pull": { "dislikes": user?.id } },
                    { 'new': true }
                )
                return NextResponse.json({
                    likes: updatedBlog.likes,
                    dislikes: updatedBlog.dislikes,
                }, { status: 200 })
            }

            const updatedBlog = await Blog.findOneAndUpdate(
                { _id: blogId },
                { "$push": { "dislikes": user?.id } },
                { 'new': true }
            )

            return NextResponse.json({
                likes: updatedBlog.likes,
                dislikes: updatedBlog.dislikes,
            }, { status: 200 })
        }

        if (action === 'comment') {

            const comments = await Comment.find({ blog: blogId })
                .populate({
                    path: 'author',
                    select: 'name'
                })

            return NextResponse.json(comments, { status: 200 })
        }

    } catch (err) {
        console.log(err.message)
    }
}


///////// Create Comment Controller//////////

export const POST = async (req, { params }) => {
    const reqBody = await req.json()
    const session = await getServerSession(authOptions)
    const [action, blogId, ...other] = params.actions

    try {
        const newComment = new Comment({
            body: reqBody.body,
            author: session.user.id,
            blog: blogId
        })

        const savedComment = await newComment.save()

        return NextResponse.json(savedComment, { status: 200 })

    } catch (err) {
        console.log(err.message)
    }

}