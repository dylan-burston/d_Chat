import './ProfilePage.css'

const ProfilePage = (props) => {

    return (
        <div className="ProfilePage">
            <img src={props.user.profilePic} alt=""/>
            <h4>Name: {props.user.name}</h4>
            <h4>Email: {props.user.email}</h4>
        </div>
    )
}

export default ProfilePage