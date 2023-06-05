import { useAuthContext } from "./useAuthContext";
import { useState } from "react";


export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (first_name, last_name, email, password, image, interests) => {
        setIsLoading(true)

        //reset the error to be null after when the inputs are wrong
        setError(null)

        const formData = new FormData();
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('email', email);
        formData.append('password', password)
        formData.append('image', image);

        interests.forEach((interest) => {
            formData.append('interests[]', interest);
        });


        const response = await fetch('signup', {
            method: 'POST',
            body: formData


        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({ type: 'LOGIN', payload: json })

            setIsLoading(false)
        }


    }
    return { signup, isLoading, error };
}