import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import useInputForm from './utils/useInputForm';
import { Button } from '@material-ui/core';
import { clearAuthState, loginUser } from '../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';

const Login = ({ location, history }) => {
    const email = useInputForm('')
    const password = useInputForm('')
    const [errors, setErrors] = useState({ 'email': "", 'password': ""})
    const dispatch = useDispatch();
    const { error, user, loading } = useSelector(state => state.auth);

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(user){
            history.push(redirect)
        }
        return () => {
           clearAuthState();
        }
    }, [history, user, redirect])

    const validateForm = () => {
        let formIsValid = true;
        let emailError = "";
        let passwordError = ""
        if(!email.value){
            formIsValid = false;
            emailError = "*Please enter email id";
        }
        if (typeof email.value !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
            if (!pattern.test(email.value)) {
              formIsValid = false;
              emailError = "*Please enter valid email id."
            }
        }
        if(!password.value){
            formIsValid = false;
            passwordError = "*Please enter your password.";
        }
        // if(password.value.length > 0 && password.value.length < 6){
        //     formIsValid = false;
        //     passwordError = "*Password should be atleast 6 characters.";
            
        // }
        setErrors({ email: emailError, password: passwordError })
        return formIsValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validateForm()){
            dispatch(loginUser(email.value, password.value));
        }
        // if()
    }
    
    // if(isLoggedIn){
    //     return <Redirect to={{ pathname: '/dashboard'}}/>
    // }

    return (
        <div className="login-signup">
            <form className="login-signup-container" onSubmit={handleSubmit}>
                <h2 className="title">Sign In</h2>
                {error && (<div className="errorMsg">{error}</div>)}
                {/* {loading && <CircularProgress color="secondary" />} */}
                <TextField
                    label="Email"
                    type="email"
                    {...email}
                 />
                 <div className="errorMsg">{errors.email}</div>
                 <TextField
                    label="Password"
                    type="password"
                    {...password}
                 />
                 <div className="errorMsg">{errors.password}</div>
                 <Button variant="contained" color="secondary" type="submit" disabled={loading}>{loading ? (<CircularProgress />): "Submit"}</Button>
                 <br />
                 <div className="">
                 Not a member? <Link to="/signup"> Signup </Link>
                 </div>
            </form>
        </div>
    )
}

export default Login
