import { createContext, useReducer } from 'react'
import AuthReducer from './AuthReducer.js'
const INITIAL_STATE = {
    // user: {
    //     _id: "65e8d9b2ff98ccb2e5dd41fa",
    //     userName: "Ahmed",
    //     userEmail:"ahmed@gmail.com",
    //     profilePicture:"",
    //     coverPicture:"",
    //     followers:["65e8d9a8ff98ccb2e5dd41f8","65e8d99eff98ccb2e5dd41f6","65e8d9bcff98ccb2e5dd41fc"],
    //     followings:[],
    //     isAdmin:false,
    // },
    user:null,
    isFetching: false,
    error: false,
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}