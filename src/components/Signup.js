import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import useInputForm from './utils/useInputForm';
import { Button, CircularProgress } from '@material-ui/core';
import { clearAuthState, signupUser } from '../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';

const Signup = ({ history }) => {
    const name = useInputForm('')
    const email = useInputForm('')
    const password = useInputForm('')
    const confirmPassword = useInputForm('')
    const [errors, setErrors] = useState({'name': "", 'email': "", 'password': "", 'confirmPassword': ""})
    const dispatch = useDispatch();
    const { loading, error, signedIn } = useSelector(state => state.auth);

    useEffect(() => {
        if(signedIn){
            history.push('/login')
        }
        return () => {
           clearAuthState();
        }
    }, [signedIn])

    const validateForm = () => {
        let formIsValid = true;
        let emailError = "";
        let passwordError = "";
        let nameError = "";
        let confirmPasswordError= "";
        if(!name.value){
            formIsValid = false;
            nameError = "*Please enter name"
        }
        if(name.value.length > 0 && name.value.length < 6){
            formIsValid = false;
            nameError = "*Name should be atleast 6 characters"
        }
        if(!email.value){
            formIsValid = false;
            emailError = "*Please enter email id";
        }
        if (typeof email.value !== "undefined") {
            //regular expression for email validation
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
        if(password.value.length > 0 && password.value.length < 6){
            formIsValid = false;
            passwordError = "*Password should be atleast 6 characters.";
            
        }
        if(!confirmPassword.value){
            formIsValid = false;
            confirmPasswordError = "*Please enter confirm password";
        }
        if(password.value !== confirmPassword.value){
            formIsValid = false;
            confirmPasswordError = "*Confirm Password doesn't match";
        }
        setErrors({name: nameError, email: emailError, password: passwordError, confirmPassword:  confirmPasswordError})
        return formIsValid;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(validateForm()){
            dispatch(signupUser(name.value, email.value, password.value));
        }
    }

    // if(isLoggedIn){
    //     return <Redirect to={{ pathname: '/dashboard'}}/>
    // }
    return (
        <div className="login-signup">
            <form className="login-signup-container" onSubmit={handleSubmit}>
                <h2 className="title">Sign Up</h2>
                {error && (<div className="errorMsg">{error}</div>)}
                <TextField
                    label="Name"
                    type="text"
                    {...name}
                 />
                 <div className="errorMsg">{errors.name}</div>
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
                 <TextField
                    label="confirm Password"
                    type="password"
                    {...confirmPassword}
                 />
                 <div className="errorMsg">{errors.confirmPassword}</div>
                 <Button variant="contained" color="secondary" type="submit" disabled={loading}>{loading ? (<CircularProgress />): "Submit"}</Button>
                 <br />
                 <div>
                 Already member? <Link to="/login"> SignIn </Link>
                 </div>
            </form>
        </div>
    )
}

export default Signup
