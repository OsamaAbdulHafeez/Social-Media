import React from 'react'
import './closefreind.css'
const CloseFreind = ({ user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <li className="sidebarFreind">
            <img className='sidebarFreindImg' src={PF + user.profilePicture} alt="" />
            <span className='sidebarFreindName'>{user.username}</span>
        </li>
    )
}

export default CloseFreind
