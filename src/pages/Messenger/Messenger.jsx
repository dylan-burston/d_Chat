import './Messenger.css';

const Messenger = (props) => {
    const [receiver, setReceiver] = useState(null);

    const handleClick = (incomingFriendId) => {
        setReceiver(incomingFriendId)
      }


  return (
    <div className="messenger">
        <div className="title">Chat</div>
        <div className="messengerContainer">
          <div className="chatContainer">
            <h1>Friends</h1>
            {allFriends.map((contact, id) => (
              <div key={id} className="friendContainer">
                <option key={id} value={contact._id} onClick={() => handleClick(contact._id)}>{contact.name}</option>
              </div>
            ))}
          </div>
          <div className="conversationContainer">
            <h1>Chat</h1>
            {receiver ? <Conversation userId={props.user._id} receiverId={receiver}/> : <div>Choose a Conversation</div> }
          </div>
          
        </div>
        <div className="friendRequestContainer">
            <form className="friendRequestForm" onSubmit={handleSubmit}>
              <select type="text" name="friendId" onChange={(event)=>handleFriendRequestSelect(event)} value={friend}>
                <option>Choose Friend</option>
                {allUsers.map((contact, id) => (
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