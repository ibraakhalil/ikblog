import Comment from "@/models/comment"
import { NextResponse } from "next/server"


// export const GET = async (req, {params}) => {
//     const {commentid} = params
//     try {
//         const comment = await Comment.findOne({_id: commentid  })
//     } catch (err) {
//         console.log(err.message)
//     }
// }

export const POST = async (req, { params }) => {
    const replyBody = await req.json()
    const { commentid } = params
    
    try {
        const updateComment = await Comment.findOneAndUpdate(
            { _id: commentid },
            { "$push": { "replies": replyBody } },
            { new: true }
        )

        return NextResponse.json(updateComment, { status: 200 })

    } catch (err) {
        console.log(err.message)
    }
}