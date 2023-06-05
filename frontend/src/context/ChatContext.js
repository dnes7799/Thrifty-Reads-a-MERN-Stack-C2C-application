import { createContext, useReducer } from "react";

export const ChatContext = createContext()

export const chatReducer = (state, action) => {
    switch (action.type) {
        case 'GET_MESSAGE':
            return {
                messages: action.payload
            }
        case 'SEND_MESSAGE':
            return {
                messages: [action.payload, ...state.messages]
            }
        
        default:
            return state
    }
}

export const ChatContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(chatReducer, {
        messages: null
    })
    return (
        <ChatContext.Provider value={{ ...state, dispatch }} >
            {children}
        </ChatContext.Provider>
    )
}