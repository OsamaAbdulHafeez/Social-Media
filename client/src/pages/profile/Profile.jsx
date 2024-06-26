import React, { useEffect, useState } from 'react'
import './profile.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import Feed from '../../components/feed/Feed'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Profile = () => {

    const username = useParams().username
    const [user,setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/api/user?userName=${username}`)
            setUser(res.data)
        }
        fetchUser()
    }, [username])
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img 
                            className='profileCoverImg' 
                            src={user.coverPicture ? PF + user.coverPicture : PF + "person/noCover.png"} alt="" />
                            <img 
                            className='profileUserImg' 
                            src={user.profilePicture ?PF +  user.profilePicture : PF + "person/noAvatar.png"} alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>{user.userName}</h4>
                            <span className='profileInfoDesc'>{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/>
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
