import React from 'react'
import './online.css'
const Online = ({user}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <li className="rightbarFreind">
            <div className="rightbarProfileImgContainer">
                <img className='rightbarProfileImg' src={PF + user.profilePicture} alt="" />
                <span className='rightbarOnline'></span>
            </div>
            <span className='rightbarUserName'>{user.username}</span>
        </li>
    )
}

export default Online
