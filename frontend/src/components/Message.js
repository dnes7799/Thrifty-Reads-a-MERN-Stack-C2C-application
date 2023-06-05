import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Message = ({ message, sender }) => {


    
    return (
        <div className={sender ? "own-message" : "others-message"}>
            <div>
                <p>
                   {sender.name} {message.text}
                </p>
                <p className='message-time'>
                    {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                </p>

            </div>

        </div>

    );
}

export default Message;