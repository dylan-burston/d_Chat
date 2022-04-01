import './ProfilePage.css'
import axios from 'axios';
import {useEffect, useState} from "react";

const ProfilePage = (props) => {

    const [picTemp, setPicTemp] = useState(props.user.profilePic)
    const [ageTemp, setAgeTemp] = useState(props.user.age)
    const [captionTemp, setCaptionTemp] = useState(props.user.caption)

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await axios.put(`/api/users/${props.user._id}/update`, {pic: picTemp, age: ageTemp, caption: captionTemp});
    }

    useEffect(() => {
        props.grabUserFromDB();
        setPicTemp(props.user.profilePic);
        setAgeTemp(props.user.age);
        setCaptionTemp(props.user.caption)
    }, [props.user.profilePic, props.user.age, props.user.caption])

    return (
        <div className="ProfilePage">
            <img src={picTemp} alt=""/>
            <h4>Name:</h4>
            {props.user.name}
            <hr />
            <h4>Email:</h4>
            {props.user.email}
            <hr />
            <h4>Age:</h4>
            {ageTemp ? ageTemp : "No age set"}
            <hr />
            <h4>Caption:</h4>
            {captionTemp}
            <hr />

            <h3>Update Profile Data</h3>
            <form className="updateProfileForm" onSubmit={handleSubmit}>
                <input placeholder="Profile Picture Link" type="text" onChange={(evt) => setPicTemp(evt.target.value)}/>
                <input placeholder="Age" type="text" onChange={(evt) => setAgeTemp(evt.target.value)}/>
                <input placeholder="Caption (max of 50 characters)" type="text" onChange={(evt) => setCaptionTemp(evt.target.value)}/>
                <button>Save Changes</button>
            </form>

            <button className="deleteButton" onClick={props.handleDeleteAccount}>Delete Account</button>

        </div>
    )
}

export default ProfilePage;