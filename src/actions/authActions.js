import 
{ 
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_SIGNUP_REQUEST, 
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL, 
    USER_LOGOUT,
    CLEAR_AUTH_STATE
} from "./types"
import axios from '../utils/axios'
import { removeUserSession, setUserSession } from "../utils/Common"

export const loginUser = (email, password) => async dispatch => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        console.log(email, password)
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
    
        let { data } = await axios.post('/auth/signin', { email, password }, config);
        console.log(data)
        if(data.success){
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data.userInfo
            })
            setUserSession(data.token, data.userInfo)
        }
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
    
        
}

export const signupUser = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_SIGNUP_REQUEST
        })
        console.log(name, email, password)
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
    
        let { data } = await axios.post('/auth/signup', {name, email, password }, config);
        console.log(data)
        if(data.success){
            dispatch({
                type: USER_SIGNUP_SUCCESS,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}

export const logout = () => dispatch =>  {
    dispatch({
        type: USER_LOGOUT
    })
    removeUserSession();
}

export const clearAuthState = () => dispatch => {
    dispatch({
        type: CLEAR_AUTH_STATE
    })
}