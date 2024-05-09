// import express from 'express'
// import mongoose from 'mongoose'
// import UserSchema from '../models/usermodel.js'
// import { Login, Register } from '../Controller/authController.js'
const express = require("express")
const mongoose = require("mongoose")
const UserSchema = require('../models/usermodel.js')
const { Login, Register } = require('../Controller/authController.js')
const authRouter = express.Router()

// REGISTER
authRouter.post("/register",Register)
authRouter.post("/login",Login)

module.exports = {authRouter}
