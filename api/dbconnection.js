// import mongoose from "mongoose";
// import dotenv from 'dotenv'

const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const dbconnection = async() =>{
    try {
        const con = await mongoose.connect(process.env.MONGO_DB_URL)
        console.log(`MongoDb Connect`)
    } catch (error) {
        console.log(error)        
    }
}
// export default dbconnection
module.exports =  dbconnection