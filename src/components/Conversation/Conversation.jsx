import './Conversation.css'
import Message from '../Message/Message';
import {useEffect, useState} from 'react';
import axios from 'axios';

const Conversation = (props) => {

    const [allMessages, setAllMessages] = useState([]);
    const [sentMessage, setSentMessage] = useState("");
  
    const handleSubmit = async (evt) => {
      setAllMessages([...allMessages, {message: sentMessage}])
      await axios.post(`/api/messages/new`, {senderId: props.userId, receiverId: props.receiverId, text: sentMessage})
      setSentMessage("")
    }

    const getAllConvoMessages = async () => {
        let messages = await axios.get(`/api/messages/${props.userId}/${props.receiverId}`)
        setAllMessages(messages.data);
    }

    useEffect(()=> {
        if (props.receiverId || sentMessage) getAllConvoMessages();
        console.log(allMessages)
    }, [props.receiverId, sentMessage])

    return (
        <div className="Conversation">
            <div className="chatContainer">
                <div className="chatBox">
                    {allMessages.map((message, id) => (
                        <Message key={id} message={message.text} />
                    ))}
                </div>
                <div className="sendBox">
                    <textarea onChange={(evt)=>setSentMessage(evt.target.value)} value={sentMessage}></textarea>
                    <button className="submitButton" onClick={handleSubmit}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Conversation;