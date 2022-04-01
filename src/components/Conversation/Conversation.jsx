import './Conversation.css'
import Message from '../Message/Message';
import {useRef, useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import axios from 'axios';

const Conversation = (props) => {

    const [allMessages, setAllMessages] = useState([]);
    const [sentMessage, setSentMessage] = useState('');
    const [incomingMessage, setIncomingMessage] = useState(null);
    const socket = useRef();
    const scrollRef = useRef();
    
    const handleSubmit = async (evt) => {
      setAllMessages([...allMessages, {message: sentMessage}])
      await axios.post(`/api/messages/new`, {senderId: props.userId, receiverId: props.receiverId, content: sentMessage})
      socket.current.emit('send_message', {
          senderId: props.userId,
          receiverId: props.receiverId,
          content: sentMessage,
      })
      setSentMessage("")
    }

    const getAllConvoMessages = async () => {
        let messages = await axios.get(`/api/messages/${props.userId}/${props.receiverId}`)
        setAllMessages(messages.data);
    }

    useEffect(()=> {
        if (props.receiverId || sentMessage) getAllConvoMessages();
    }, [props.receiverId, sentMessage])

    useEffect(() => {

        socket.current = io()

        socket.current.on("get_message", data => {
            setIncomingMessage({
                senderId: data.senderId,
                receiverId: props.userId,
                content: data.content
            })
        })

    }, [])

    useEffect(() => {
        if (incomingMessage) setAllMessages([...allMessages, incomingMessage])
    }, [incomingMessage, props.receiverId])

    useEffect(() => {
        socket.current.emit("send_user", props.userId)
    }, [props.userId])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[allMessages])

    return (
        <div className="Conversation">
            <div className="chatContainer">
                <div className="chatBox">
                    {allMessages.map((message, id) => (
                        <div key={id} ref={scrollRef}>
                            <Message message={message.content} senderId={message.senderId} userId={props.userId}/>
                        </div>
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