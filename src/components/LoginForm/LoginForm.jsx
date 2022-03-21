import './LoginForm.css'
import {useState} from 'react';
import axios from 'axios';

const LoginForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleChange = (evt) => {
        if (evt.target.name === "email") setEmail(evt.target.value)
        else if (evt.target.name === "password") setPassword(evt.target.value)
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try { 
            let token = await axios.post('/api/users/login', {email, password})
            localStorage.setItem('token', token.data);
            props.setUserState(JSON.parse(atob(token.data.split('.')[1])).user);
        } catch (err) {
            setErrorMessage('Bad Credentials');
        }
    }

    return (
        <div className="LoginForm">
            <form className="loginForm" onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required/>
                <input type="password" name="password" placeholder="Your Password" onChange={handleChange} required/>
                <button>Login</button>
            </form>
            <p className="errorMessage">{errorMessage}</p>
        </div>
    )
}

// localStorage.removeItem('token');
// token = null;
// above will log out when posed in dev console 
// to debug the sign in/ out issue.. sign in and sign out with above code


export default LoginForm;