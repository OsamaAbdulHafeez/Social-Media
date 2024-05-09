// import mongoose from "mongoose";
// import UserSchema from '../models/usermodel.js'
// import bcrypt from 'bcrypt'
const UserSchema = require("../models/usermodel.js")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const UpdateUser = async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (error) {
                res.status(500).json(error.message)
            }
        }
        try {
            const user = await UserSchema.findByIdAndUpdate(req.params.id, { $set: req.body })
            res.status(200).json(user)
        } catch (error) {
            res.status(500).send(error.message)
        }
    } else {
        res.status(403).send("You can Update Only your Account")
    }
}
const DeleteUser = async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const deleteUser = await UserSchema.deleteOne({ _id: req.params.id })
            res.status(200).send("Delete User Successfully")
        } catch (error) {
            res.status(500).json(error.messsage)
        }
    } else {
        res.status(403).send("You can Delete only Your Account")
    }
}
const getUser = async (req, res) => {
    const userId = req.query.userId
    const userName = req.query.userName
    try {
        const user = 
        userId ? 
        await UserSchema.findById(userId)
        :await UserSchema.findOne({userName:userName})
        const { password, updatedAt, ...other } = user._doc
        res.status(200).json(other)
    } catch (error) {
        res.status(403).json(error.message)
    }
}
const getFreind = async(req,res) =>{
    try {
        const user = await UserSchema.findById(req.params.userId)
        const freinds = await Promise.all(
            user?.followings.map(freindId=>{
                return UserSchema.findById(freindId)
            })
        )
        let freindList = []
        freinds.map(freind=>{
            const {_id,userName,profilePicture} = freind
            freindList.push({_id,userName,profilePicture})
        })
       
        res.status(200).json(freindList)
    } catch (error) {
        res.status(500).json(error)
    }
}
const FollowUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        const user = await UserSchema.findById(req.params.id)
        const currentUser = await UserSchema.findById(req.body.userId)
        if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({ $push: {followers:req.body.userId} })
            await currentUser.updateOne({ $push: {followings:req.params.id} })
            res.status(200).send("user has been followed")
        } else {
            res.status(403).send("You Already Follow this User")
        }
    }
    else {
        res.status(403).send("You can't follow your self")
    }
}
const UnFollowUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        const user = await UserSchema.findById(req.params.id)
        const currentUser = await UserSchema.findById(req.body.userId)
        if (user.followers.includes(req.body.userId)) {
            await user.updateOne({ $pull: {followers:req.body.userId} })
            await currentUser.updateOne({ $pull: {followings:req.params.id} })
            res.status(200).send("user has been unfollowed")
        } else {
            res.status(403).send("You don't Follow this User")
        }
    }
    else {
        res.status(403).send("You can't unfollow your self")
    }
}

module.exports = {UnFollowUser,FollowUser,getUser,DeleteUser,UpdateUser,getFreind}