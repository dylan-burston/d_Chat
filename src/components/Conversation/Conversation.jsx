import './Conversation.css'
import Message from '../Message/Message';


const Conversation = (props) => {
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