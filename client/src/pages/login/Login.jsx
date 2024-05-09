import { useContext, useRef } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { loginCall } from '../../apiCall.js'
import { AuthContext } from '../../context/AuthContext.js'
import CircularProgress from '@mui/material/CircularProgress'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'

const Login = () => {
  const email = useRef();
  const password = useRef();

  const { user, isFetching, error, dispatch } = useContext(AuthContext)
  const handleClick = (e) => {
    e.preventDefault()
    loginCall({ userEmail: email.current.value, password: password.current.value }, dispatch)
  };
  console.log(user)
  
  const theme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
    }
  })
  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className='loginLogo'>Social Media</h3>
          <span className='logindesc'>Connect with freinds and the world around you on Lamasocial.</span>
        </div>
        <div className="loginRight" onSubmit={handleClick}>
          <form className="loginBox">
            <input
              placeholder="Email"
              type='email'
              className="loginInput"
              ref={email}
              required />
            <input
              minLength={6}
              placeholder="Password"
              type='password'
              className="loginInput"
              ref={password}
              required />
            <button className='loginButton' type='submit' disabled={isFetching}>
              {isFetching ?
                <ThemeProvider theme={theme}>
                  <CircularProgress color="primary" size="15px"/>
                </ThemeProvider> : "Log In"}
            </button>
            <span className='loginforgot'>Forgot Password</span>
            {/* <button className='loginRegisterButton'>
            {isFetching ?
                <ThemeProvider theme={theme}>
                  <CircularProgress color="primary" size="15px"/>
                </ThemeProvider> : "Create a New Account"}
            </button> */}
            <Link to="/register" className='loginLink'>
              <button className='loginRegisterButton'>
              Create a New Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
