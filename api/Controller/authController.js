// import UserSchema from '../models/usermodel.js'
// import bcrypt from 'bcrypt'
const UserSchema = require("../models/usermodel.js")
const bcrypt = require("bcrypt")
const Register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = await new UserSchema({
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            password: hashedPassword
        })
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).send(error)
    }
}
const Login = async (req, res) => {
    try {
        const user = await UserSchema.findOne({ userEmail: req.body.userEmail })
        !user && res.status(404).send("user not found")
        const validpassword = await bcrypt.compare(req.body.password, user.password)
        !validpassword && res.status(400).send("wrong password")

        res.status(200).json(user)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {Login,Register}