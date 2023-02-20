import { useState } from "react";
import '../styles/signup.css'
import{useSignup} from '../hooks/useSignup'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {signup, error, isLoading} = useSignup()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()


        await signup(first_name, last_name, email, password);

        navigate('/')

    }
    return (
        <div className="signup-form mx-5">
            <form className="signup" onSubmit={handleSubmit}>
                <h3>Sign Up</h3>
                <label >First Name: </label>
                <input
                    type="text"
                    onChange={(e) => setFirst_name(e.target.value)}
                    value={first_name}
                    required
                    
                />
                <label>Last Name: </label>
                <input
                    type="text"
                    onChange={(e) => setLast_name(e.target.value)}
                    value={last_name}
                    required
                />

                <label>Email: </label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />

                <label>Password: </label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button className="my-4" disabled={isLoading}> Signup</button>
                {error && <div className="error text-danger">{error}</div>}
            </form>
        </div>
    )
}

export default Signup;