import './Messenger.css';
import {useEffect, useState} from "react";
import Conversation from '../../components/Conversation/Conversation';
import axios from 'axios';

const Messenger = (props) => {

  const [allUsers, setUsers] = useState([]);
  const [allFriends, setFriends] = useState([]);
  const [allRequests, setFriendRequests] = useState([])
  const [friend, setFriend] = useState('');
  const [receiver, setReceiver] = useState(null);

  const fetchUsers = async () => {
    let usersData = await axios.get('/api/users');
    let friendsData = await axios.get('/api/users/friends');
    setFriends(friendsData.data);
    setUsers(usersData.data.filter(user => user._id !== props.user._id && user.friends.includes(props.user._id) && !props.user.friends.includes(user._id)));
    setFriendRequests(usersData.data.filter(user => user._id !== props.user._id && !props.user.friends.includes(user._id) && !user.friends.includes(props.user._id)))
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  const handleClick = (incomingFriendId) => {
    setReceiver(incomingFriendId)
  }

  const handleFriendRequestSelect = async (event) => {
    setFriend(await event.target.value)
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await axios.post(`/api/users/${props.user._id}/${friend}/new`);
  }

  return (
    <div className="messenger">
        <div className="messengerContainer">
          <div className="chatContainer">
            <h1>Friends</h1>
            {allFriends.map((contact, id) => (
              <div key={id} className="friendContainer" value={contact._id} onClick={() => handleClick(contact._id)}>
                <div key={id}><img src={contact.profilePic} alt=""/>{contact.name}</div>
              </div>
            ))}
            <div className="acceptRequestContainer">
              <h5>Friend Requests</h5>
              <form className="friendRequestForm" onSubmit={handleSubmit}>
                <select type="text" name="friendId" onChange={(event)=>handleFriendRequestSelect(event)} value={friend}>
                  <option>Choose Friend</option>
                  {allUsers.map((request, id) => (
                      <option key={id} value={request._id}>{request.name}</option>
                  ))}
                </select>
                <button>Accept Friend Request</button>
              </form>
            </div>
          </div>
          <div className="conversationContainer">
            <h1>Chat</h1>
            {receiver ? 
            <Conversation userId={props.user._id} receiverId={receiver}/>
            :
            <div>Choose a Conversation</div>
            }
          </div>
          
        </div>
        <div className="friendRequestContainer">
            <form className="friendRequestForm" onSubmit={handleSubmit}>
              <select type="text" name="friendId" onChange={(event)=>handleFriendRequestSelect(event)} value={friend}>
                <option>Choose Friend</option>
                {allRequests.map((contact, id) => (
                    <option key={id} value={contact._id}>{contact.name}</option>
                ))}
              </select>
              <button>Send Friend Request</button>
            </form>
        </div>
    </div>
  );
}

export default Messenger;