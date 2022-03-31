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
    setUsers(usersData.data.filter(user => user._id !== props.user._id && user.friends.includes(props.user._id) && !props.user.friends.includes(user._id)));
    setFriendRequests(usersData.data.filter(user => user._id !== props.user._id && !props.user.friends.includes(user._id) && !user.friends.includes(props.user._id)))
  }

  useEffect(() => {
    fetchUsers();
    props.getFriends();
    setFriends(props.friends);
  }, [props.friends.length])

  const handleClick = (incomingFriendId) => {
    setReceiver(incomingFriendId)
  }

  const handleSendRequest = (event) => {
    setFriend(event.target.value)
  }

  const handleAcceptRequest = (event) => {
    setFriend(event.target.value)
  }

  const handleSendRequestSubmit = async (evt) => {
    evt.preventDefault();   
    setFriendRequests(allRequests.filter(user => user._id !== friend))
    await axios.post(`/api/users/${props.user._id}/${friend}/new`);
  }

  const handleAcceptRequestSubmit = async (evt) => {
    evt.preventDefault();
    let newFriend = allUsers.find(user => user._id == friend)
    setUsers(allUsers.filter(user => user._id !== friend))
    if (!allFriends.includes(newFriend)) setFriends([...allFriends, newFriend])
    await axios.post(`/api/users/${props.user._id}/${friend}/new`);
    await props.getFriends();
    console.log(props.friends.length)
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
              <form className="friendRequestForm" onSubmit={handleAcceptRequestSubmit}>
                <select type="text" name="friendId" onChange={(event)=>handleAcceptRequest(event)} value={friend}>
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
            <form className="friendRequestForm" onSubmit={handleSendRequestSubmit}>
              <select type="text" name="friendId" onChange={(event)=>handleSendRequest(event)} value={friend}>
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