import React, { useContext, useEffect, useState } from 'react'
import './post.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { format } from 'timeago.js'
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

const Post = ({ post }) => {
    const [like, setLike] = useState(post.like.length)
    const [isLike, setIsLike] = useState(false)
    const [user, setUser] = useState({})
    const { user: currentUser } = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/api/user?userId=${post.userId}`)
            setUser(res.data)
        }
        fetchUser()
    }, [post.userId])

    useEffect(() => {
        setIsLike(post.like.includes(currentUser?._id))
    }, [currentUser?._id, post.userId])
    
    const likehandler = () => {
        try {
            axios.put(`api/posts/${post._id}/like`, { userId: currentUser._id })
        } catch (error) {
            console.log(error)
        }
        setLike(isLike ? like - 1 : like + 1)
        setIsLike(!isLike)
    }
    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.userName}`}>
                            <img
                                className='postProfileImg'
                                src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
                                alt="" />
                        </Link>
                        <span className='postUserName'>{user.userName}</span>
                        <span className='postDate'>{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className='postImg' src={PF + post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className='likeIcon' src={`${PF}like.png`} onClick={likehandler} alt="" />
                        <img className='likeIcon' src={`${PF}heart.png`} onClick={likehandler} alt="" />
                        <span className='postLikeCounter'>{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className='postCommentText'>{post.comment} Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
