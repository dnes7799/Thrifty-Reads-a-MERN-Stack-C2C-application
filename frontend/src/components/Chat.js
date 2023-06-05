import { useEffect, useState } from "react";

import { useAuthContext } from "../hooks/useAuthContext";

const Chat = ({ conversation, currentUser }) => {

    const [customer, setCustomer] = useState(null)

    const { user } = useAuthContext()

    useEffect(() => {
        const friendId = conversation.users.find((m) => m !== currentUser)

        const getUser = async () => {
            try {
                const response = await fetch("/user/" + friendId, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json()
                if (response.ok) {
                    setCustomer(json)
                }
            } catch (error) {
                console.log({ error: error.message })
            }
        }
        if (user) {
            getUser()
        }
    }, [currentUser, conversation, user])


    return (
        <div className="chat-page m-2 d-flex flex-column">
            {customer &&
                <div className="customer d-flex">
                    <img src={customer.image ? `http://localhost:8000/public/${customer.image}` : 'http://localhost:8000/public/avatar.png'} alt='user-pic' />
                    <span className="m-1">{customer.first_name} {customer.last_name}</span>
                </div>
            }
        </div>
    );
}

export default Chat;