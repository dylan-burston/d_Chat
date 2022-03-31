import './ProfilePage.css'
import axios from 'axios';
import {useEffect, useState} from "react";

const ProfilePage = (props) => {

    const [profilePic, setProfilePic] = useState('')
    const [pic, setPic] = useState(props.user.profilePic)

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setPic(profilePic);
        await axios.put(`/api/users/${props.user._id}/update`, {profilePic});
    }

    useEffect(() => {
        props.grabUserFromDB();
        setPic(props.user.profilePic);
    }, [props.user.profilePic])

    return (
        <div className="ProfilePage">
            <img src={pic} alt=""/>
            <h4>Name: {props.user.name}</h4>
            <h4>Email: {props.user.email}</h4>

            <form className="updateProfileForm" onSubmit={handleSubmit}>
                <input placeholder="Profile Picture" onChange={(evt) => setProfilePic(evt.target.value)}/>
                <button>Update Profile</button>
            </form>

            <button onClick={props.handleDeleteAccount}>Delete Account</button>

        </div>
    )
}

export default ProfilePage;