import { createContext, useEffect, useReducer } from 'react'


//initialization of createContext
export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                //user is whatever the payload is in the action
                user: action.payload
            }
        case 'LOGOUT':
            return {
                user: null
            }
        default:
            return state
    }

}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            const { exp } = JSON.parse(atob(user.token.split('.')[1]))

            if (exp * 1000 < Date.now()) {
                localStorage.removeItem('user')

                dispatch({ type: 'LOGOUT' })
            }
            else {
                dispatch({ type: 'LOGIN', payload: user })
            }


        }
        
        //debugger://VM641 installHook.js 1861

    }, [])
    console.log('AuthContext State:', state)


    return (

        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )

}

