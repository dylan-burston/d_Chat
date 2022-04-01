import './AuthPage.css'
import {useState} from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

const AuthPage = (props) => {
    const [isLoginPage, setIsLoginPage] = useState(false);
    return (
        <div className="AuthPage">
            {!isLoginPage ?
                <SignUpForm {...props} />
            :
                <LoginForm {...props} />
            }
            <div onClick={() => setIsLoginPage(!isLoginPage)}>
                {!isLoginPage ? 'Already a member? Log in!' : 'Not a member yet? Sign Up!'}
            </div>
        </div>
    )
}

export default AuthPage;