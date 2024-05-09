import './share.css'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
const Share = () => {

    // const { user } = useContext(AuthContext)
    const user = JSON.parse(localStorage.getItem('LoginUser'))
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const desc = useRef()
    const [file, setFile] = useState(null)

    const submitHandler = async(e) => {
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if (file) {
            const data = new FormData()
            const fileName = Date.now() + file.name
            data.append("name", fileName)
            data.append("file", file)
            newPost.img = fileName
            console.log(newPost)
            try {
                await axios.post("/api/upload", data)
            } catch (error) {
                console.log(error)
            }
        }
        try {
            await axios.post('/api/posts', newPost)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        className='shareProfileImg'
                        src={user?.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png'}
                        alt=""
                    />
                    <input
                        className='shareInput'
                        placeholder={`Whats's in your mind ${user.userName}?`}
                        ref={desc}
                    />
                </div>
                <hr className='sahreHr' />
                {file && (
                    <div className='shareImgContainer'>
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        <CloseIcon className="shareCancelImg" onClick={()=>setFile(null)}/>
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label className="shareOption" htmlFor='file'>
                            <PermMediaIcon htmlColor="tomato" className='shareIcon' />
                            <span className='shareOptionText'>Photo or Video</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id='file'
                                accept='.png,.jpeg,.jpg'
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <LabelIcon htmlColor="blue" className='shareIcon' />
                            <span className='shareOptionText'>Tag</span>
                        </div>
                        <div className="shareOption">
                            <RoomIcon htmlColor="green" className='shareIcon' />
                            <span className='shareOptionText'>Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotionsIcon htmlColor="goldenrod" className='shareIcon' />
                            <span className='shareOptionText'>Feelings</span>
                        </div>
                    </div>
                    <button className='shareButton' type='submit'>Share</button>
                </form>
            </div>
        </div>
    )
}

export default Share
