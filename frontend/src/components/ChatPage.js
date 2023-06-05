import Chat from "./Chat";
import Message from "./Message";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect } from 'react'
import '../styles/chat.css'

const ChatPage = () => {
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [text, setText] = useState("")

    const { user } = useAuthContext()



    useEffect(() => {
        const fetchMessages = async (req, res) => {
            const response = await fetch('/chat/' + user.id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                setConversations(json)

            }
        }

        fetchMessages()

        if (currentChat && user) {
            const getMessages = async (req, res) => {
                const response = await fetch('/messages/' + currentChat._id, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })

                const json = await response.json()
                if (response.ok) {
                    setMessages(json)
                }

            }
            getMessages()

        }
    }, [currentChat, user])


    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            chatId: currentChat._id,
            senderId: user.id,
            text: text

        }

        try {
            const response = await fetch('/messages', {
                method: 'POST',
                body: JSON.stringify(message),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const json = await response.json();

            if (response.ok) {
                const allmessages = [...messages, json]
                setMessages(allmessages);

                setText('');
            }

        } catch (error) {
            console.error(error);
        }

    }

    return (

        <div className="chat-page m-2 d-flex flex-row">
            <div className="conversation d-flex flex-column">
                {conversations && conversations.map((c) => (
                    <div key={c._id} onClick={() => setCurrentChat(c)}>
                        <Chat conversation={c} currentUser={user.id} />
                    </div>
                ))}
            </div>
            <div className="messages-section">
                {currentChat ? (
                    <>
                        <div className="message-box">
                            {messages && messages.map((m) => (
                                <div key={m._id}>
                                    <Message message={m} sender={user.id} />
                                </div>
                            ))}

                        </div>
                        <div className="send-message-panel">
                            <form onSubmit={handleSend}>
                                <input
                                    type="text"
                                    placeholder="Message..."
                                    onChange={(e) => setText(e.target.value)}
                                    value={text}
                                />
                                <button>Send</button>
                            </form>
                        </div>
                    </>
                )

                    : (
                        <span className="open-conversation">Open a conversation to chat</span>
                    )
                }

            </div>


        </div>

    )
}

export default ChatPage;