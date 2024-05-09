import axios from 'axios'

export const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" })
    try {
        const res = await axios.post('/api/auth/login', userCredential)
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
        localStorage.setItem('LoginUser',JSON.stringify(res.data))
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error })
    }
}