import React from 'react';
import './UserLogOut.css'

export default function UserLogOut(props) {
    return (
        <div className='UserLogOut'>
            <button className="logout" onClick={props.handleLogOut}>Logout</button>
        </div>
    );
}