import './SignUpForm.css'
import {useState} from 'react';
import axios from 'axios';


// hooks
const SignUpForm = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setCurrentUser] = useState({});
    const disable = password !== confirm && password;

    const handleChange = (evt) => {
        if (evt.target.name === "name") setName(evt.target.value)
        else if (evt.target.name === "email") setEmail(evt.target.value)
        else if (evt.target.name === "password") setPassword(evt.target.value)
        else if (evt.target.name === "confirm") setConfirm(evt.target.value)
        setCurrentUser({name, email, password}); 
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try { 
            let token = await axios.post('/api/users/signup', user)
            localStorage.setItem('token', token.data);
            props.setUserState(JSON.parse(atob(token.data.split('.')[1])).user);
        } catch (err) {
            setErrorMessage('Sign Up Failed - Try Again');
        }
    }

    return(
        <div className="SignUpForm">
            <form className="signupForm" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required/>
                <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required/>
                <input type="password" name="password" placeholder="Your Password" onChange={handleChange} required/>
                <input type="password" name="confirm" placeholder="Confirm Password" onChange={handleChange} required/>
                <button disabled={disable}>Sign Up</button>
            </form>
            <p className="errorMessage">{errorMessage}</p>
        </div>
    )
}

export default SignUpForm;