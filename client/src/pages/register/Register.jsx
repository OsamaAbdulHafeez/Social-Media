import {
  Link, Navigate, useNavigate
} from "react-router-dom";
import './register.css'
import { useRef } from 'react'
import axios from 'axios'
import useFetch from "../../hooks/useFetch";


const Register = () => {
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const passwordAgain = useRef()
  const navigate = useNavigate()
  const checkhandler = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value) {
      passwordAgain.current.setCustomValidity("Password don't match")
    } else {
      const user = {
        userName: username.current.value,
        userEmail: email.current.value,
        password: password.current.value
      } 
      try {
        await axios.post('/api/auth/register', user);
        navigate("/login")
      } catch (error) {
        console.log(error)
      }

    }
  }
  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className='loginLogo'>Social Media</h3>
          <span className='logindesc'>Connect with freinds and the world around you on Lamasocial.</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={checkhandler}>
            <input
              placeholder="UserName"
              type='text'
              className="loginInput"
              ref={username} />
            <input
              placeholder="Email"
              type='email'
              className="loginInput"
              ref={email} />
            <input
              placeholder="Password"
              type='password'
              className="loginInput"
              ref={password}
              minLength={6} />
            <input
              placeholder="Password Again"
              type='password'
              className="loginInput"
              ref={passwordAgain} />
            <button className='loginButton' type='submit'>Sign Up</button>
            <Link to="/login" className='loginLink'>
              <button className='loginRegisterButton'>
                Log in to Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
