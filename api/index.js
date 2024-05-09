const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const multer = require("multer")
const {diskStorage} = require("multer")
const dbconnection = require("./dbconnection.js")
const {UserRouter} = require("./routes/userRouter.js")
const {authRouter} = require("./routes/authRouter.js")
const postRouter = require("./routes/postRouter.js")

const corsconfig = {
    origin:"https://social-media-omega-ivory.vercel.app",
    methods:["POST","PUT","DELETE","GET"],
    credentials:true
}
const path = require("path")
const app = express();
dotenv.config()
dbconnection()
app.use("/images", express.static(path.join(__dirname, "public/images")))
// MiddeleWare
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use(cors(corsconfig))
app.options('',cors(corsconfig))
app.get('/', (req, res) => {
    res.send("welcome to home page")
})
app.get('/users', (req, res) => {
    res.send("welcome to user page")
})


app.use("/api/user", UserRouter)
app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
})
const upload = multer({ storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        return res.status(200).json("File Uploaded Successfully")
    } catch (error) {
        console.log(error)
    }
})





app.listen(8800, () => {
    console.log("Backend server is running")
})