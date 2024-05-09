import { useContext, useEffect, useState } from 'react'
import Share from '../Share/Share'
import Post from '../post/Post'
import './feed.css'
import axios from 'axios'
import {AuthContext} from "../../context/AuthContext"
const Feed = ({username}) => {
    // const {user} = useContext(AuthContext)
    const user = JSON.parse(localStorage.getItem('LoginUser'))
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const res = username ? 
            await axios.get(`/api/posts/profile/${username}`):
            await axios.get(`/api/posts/timeline/${user._id}`)
            setPosts(res.data.sort((p1,p2)=>{
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }))
        }
        fetchPosts()
    }, [username,user?._id])
    return (
        <div className='feed'>
            <div className="feedWrapper">
                {(!username || username === user?.userName) && <Share />}
                {posts.map((p)=>(
                    <Post key={p._id} post={p}/>
                ))}


            </div>
        </div>
    )
}

export default Feed
