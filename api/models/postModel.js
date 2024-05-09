// import mongoose from "mongoose";
const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        maxlength:50
    },
    img:{
        type:String
    },
    like:{
        type:Array,
        default:[]
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Posts", PostSchema)