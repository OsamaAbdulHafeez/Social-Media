// import express from 'express'
// import { CreatePost, DeletePost, LikedPost, Timeline, UpdatePost, getPost, getUserPost } from '../Controller/postController.js'

const express = require("express")
const { CreatePost, DeletePost, LikedPost, Timeline, UpdatePost, getPost, getUserPost } = require('../Controller/postController.js')
const postRouter = express.Router()

postRouter.post('/',CreatePost)
postRouter.put('/:id',UpdatePost)
postRouter.delete('/:id',DeletePost)
postRouter.put('/:id/like',LikedPost)
postRouter.get('/:id',getPost)
postRouter.get('/timeline/:userId',Timeline)
postRouter.get('/profile/:username',getUserPost)

module.exports = postRouter