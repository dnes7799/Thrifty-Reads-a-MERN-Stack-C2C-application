import { useAuthContext } from "./useAuthContext";
import { useState } from "react";


export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (first_name, last_name, email, password) => {
        setIsLoading(true)

        //reset the error to be null after when the inputs are wrong
        setError(null)

        const response = await fetch('signup', {
            method: 'POST',
            body: JSON.stringify({first_name, last_name, email, password}),
            headers: {'Content-Type': 'application/json'}
            
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        
        if(response.ok){
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }


    }
    return {signup, isLoading, error};
}