import './Message.css'

const Message = (props) => {
    if (props.senderId == props.userId) {
        return (
        <div className="message you">
           {props.message}
        </div>
        )
    } else {
        return (
            <div className="message">
                {props.message}
            </div>
        )
    }
}

export default Message;