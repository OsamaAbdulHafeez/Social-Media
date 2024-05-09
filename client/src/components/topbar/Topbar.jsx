import React, { useContext } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './topbar.css'
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext"
const Topbar = () => {

  // const {user} = useContext(AuthContext)
  const user = JSON.parse(localStorage.getItem('LoginUser'))
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const { dispatch } = useContext(AuthContext)
  const logouthandler = () =>{
    dispatch({
      type:"LOGOUT",
      payload:null
    })
    
    localStorage.removeItem("LoginUser")
  }
  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className='logo'>
            Social Media
          </span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input placeholder='Search for Freind, post or videos' className='searchInput' />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Home</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <ChatIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <div className='profile'>
          <Link to={`/profile/${user?.userName}`}>
            <img
              src={user?.profilePicture ? PF + user?.profilePicture : PF + "person/noAvatar.png"}
              alt=""
              className='topbarImg'
            />
          </Link>
          <div className="logout">
            <span className="topbarLink" onClick={logouthandler}>Logout</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
