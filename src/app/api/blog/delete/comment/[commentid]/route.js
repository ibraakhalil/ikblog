import Blog from "@/models/blog"
import Comment from "@/models/comment"
import { NextResponse } from "next/server"

export const DELETE = async (req, { params }) => {
    const { commentid } = params
    try {
        const deletedComment = await Comment.deleteOne({ _id: commentid })
        await Blog.findOneAndUpdate(
            { _id: deletedComment.blog },
            { $pull: { 'comments': commentid } }
        )
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (err) {
        console.log(err.message)
    }
}