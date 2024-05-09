// import mongoose from "mongoose";
// import PostSchema from "../models/postModel.js"
// import UserSchema from "../models/usermodel.js"
const mongoose = require("mongoose")
const UserSchema = require("../models/usermodel.js")
const PostSchema = require("../models/postModel.js")
const CreatePost = async (req, res) => {
    try {
        const newPost = await new PostSchema(req.body)
        const savePost = await newPost.save()
        res.status(200).json(savePost)

    } catch (error) {
        res.status(500).json(error.message)
    }
}
const UpdatePost = async (req, res) => {
    try {
        const post = await PostSchema.findById(req.params.id)
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("the post has been updated")
        } else {
            res.status(403).send("You can update only your Post")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}
const DeletePost = async (req, res) => {
    try {
        const post = await PostSchema.findById(req.params.id)
        if (post.userId === req.body.userId) {
            await post.deleteOne()
            res.status(200).json("the post has been deleted")
        } else {
            res.status(403).send("You can delete only your Post")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}
const LikedPost = async (req, res) => {
    try {
        const post = await PostSchema.findById(req.params.id)
        if (!post.like.includes(req.body.userId)) {
            await post.updateOne({ $push: { like: req.body.userId } })
            res.status(200).json("Post has been liked")
        }
        else {
            await post.updateOne({ $pull: { like: req.body.userId } })
            res.status(200).json("Post has been disliked")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}
const getPost = async (req, res) => {
    try {
        const post = await PostSchema.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
const Timeline = async (req, res) => {
    try {
        const currentUser = await UserSchema.findById(req.params.userId)
        const userPosts = await PostSchema.find({ userId: currentUser._id })

        const freindPost = await Promise.all(
            currentUser.followings.map((freindId) => {
                return PostSchema.find({ userId: freindId })
            })
        )
        res.status(200).json(userPosts.concat(...freindPost))
    } catch (error) {
        res.status(500).json(error.message)
    }
}
const getUserPost = async (req, res) => {
    try {
        const user = await UserSchema.findOne({ userName: req.params.username })
        const posts = await PostSchema.find({userId:user._id})
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {getUserPost,Timeline,getPost,LikedPost,DeletePost,CreatePost,UpdatePost}