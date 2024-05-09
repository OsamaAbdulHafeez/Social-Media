// import express from "express"
const express = require("express")
// import { DeleteUser, FollowUser, UnFollowUser, UpdateUser, getUser } from "../Controller/userController.js"
const { DeleteUser, FollowUser, UnFollowUser, UpdateUser, getUser, getFreind } = require("../Controller/userController.js")
const UserRouter = express.Router()

// Update User
UserRouter.put("/:id",UpdateUser)
UserRouter.delete("/:id",DeleteUser)
UserRouter.get("/",getUser)
UserRouter.get("/freinds/:userId",getFreind)
UserRouter.put("/:id/follow",FollowUser)
UserRouter.put("/:id/unfollow",UnFollowUser)

module.exports = {UserRouter}