import mongoose, { Schema, model } from "mongoose";


const commentSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    blog: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Blog'
    },
    replies: [{
        body: {
            type: String,
            required: true
        },
        author: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }],
    likes: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: Schema.ObjectId,
        ref: 'User'
    }]

}, { timestamps: true })

mongoose.models = {}

export default model.comment || model('Comment', commentSchema)