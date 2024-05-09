import './rightbar.css'
import { Users } from '../../dummyData'
import Online from '../online/Online'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Rightbar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [freind, setFreinds] = useState([])
  const { dispatch } = useContext(AuthContext)
  const currentUser = JSON.parse(localStorage.getItem('LoginUser'))
  const [followed, setfollowed] = useState(currentUser?.followers.includes(user?._id))
  // UseEffect
  useEffect(() => {
    const getFreinds = async () => {
      try {
        const freindList = await axios.get(`/api/user/freinds/${user?._id}`)
        setFreinds(freindList.data)
      } catch (error) {
        console.log(error)
      }
    }
    getFreinds()
  }, [user])

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/api/user/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: 'UNFOLLOW', payload:user._id})
      }
      else {
        await axios.put(`/api/user/${user._id}/follow`, {
          userId: currentUser._id,
        });
      }
    } catch (error) {
      console.log(error)
    }
    setfollowed(!followed)
  }
  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className='birthdayImg' src="assets/gift.png" alt="" />
          <span className='birthdayText'>
            <b>Pola Foster</b> and <b>3 other freinds</b> have a birthday today
          </span>
        </div>
        <img className='rightbarAd' src="assets/ad.png" alt="" />
        <h4 className='rightbarTitle'>Online Freinds</h4>
        <ul className="rightbarFreindList">
          {Users.map((e) => (
            <Online key={e.id} user={e} />
          ))}
        </ul>
      </>
    )
  }
  const ProfileRightBar = () => {
    return (
      <>
        {user?.userName !== currentUser?.userName && (
          <button className='rightbarFollowButton' onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
        <h4 className='rightbarTitle'>User Information</h4>
        <div className='rightbarInfo'>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city || "-"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from || "-"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}</span>
          </div>
        </div>
        <h4 className='rightbarTitle'>User Freinds</h4>

        <div className="rightbarFollowings">
          {freind.map((freind) => (
            <Link to={`/profile/${freind.userName}`} style={{ textDecoration: "none" }}>
              <div className="rightbarFollowing">
                <img className='rightbarFollowingImg' src={freind.profilePicture ? PF + freind.profilePicture :
                  `${PF}person/noAvatar.png`} alt="" />
                <span className='rightbarFollowingName'>{freind.userName}</span>
              </div>
            </Link>
          ))}
        </div >

      </>
    )
  }
  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  )
}

export default Rightbar
