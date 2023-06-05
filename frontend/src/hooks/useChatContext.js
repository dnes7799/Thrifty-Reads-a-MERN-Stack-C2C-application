import { useContext } from "react";
import { ChatContext } from "../context/ChatContext"

export const useChatContext = () => {
    const context = useContext(ChatContext)
    
    if(!context){
        throw Error('useChatContext must be used inside an ChatContextProvider')
    }
    return context

}