import mongoose, { Schema, model } from "mongoose";


const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    thumbnail: String,
    comments: [{
        type: Schema.ObjectId,
        ref: 'Comments'
    }],
    likes: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    
}, { timestamps: true })

mongoose.models = {}

export default model.blog || model('Blog', blogSchema)