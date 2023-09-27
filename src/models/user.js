import mongoose, { Schema, model } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: String,
    posts: [{
        type: Schema.ObjectId,
        ref: 'Post'
    }],
    isAdmin: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'User'
    }
    
}, { timestamps: true })

mongoose.models = {}

export default model.user || model('User', userSchema)