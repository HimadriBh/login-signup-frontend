import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, CLEAR_AUTH_STATE, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL } from "../actions/types";
import { getUser } from "../utils/Common";

const initialState = {
    user: null,
    loading: false,
    error: null,
    isLoggedIn: false
}
const user = getUser();

if(user !== null){
    initialState.user = user;
    initialState.isLoggedIn = true;
}

function auth(state=initialState, action){
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { ...state, loading: true, error: null, user: null}
        case USER_LOGIN_SUCCESS:
            return { ...state, loading: false, user: action.payload, isLoggedIn: true  }
        case USER_LOGIN_FAIL:
            return { ...state, error: action.payload, user: null, loading: false }
        case CLEAR_AUTH_STATE:
            return {...state, error: null} 
        case USER_SIGNUP_REQUEST:   
            return { loading: true}
        case USER_SIGNUP_SUCCESS: 
            return { ...state, loading: false, message: action.payload, signedIn: true }  
        case USER_SIGNUP_FAIL: 
            return { ...state, error: action.payload, loading: false }  
        default:
            return state;
    }
}

export default auth