import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)

        navigate('/')
    }
    const handleSignupClick = async (e) => {
        e.preventDefault()

        navigate('/signup')
    }
    return (
        <div className="login-page">
            <div className="login-form m-3">
            <form onSubmit={handleSubmit}>
                <h3>Login</h3>

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
                <button disabled={isLoading}>Login</button>
                {error && <div className="error text-danger">{error}</div>}
            </form>
            </div>
            <div className="create-account m-3">
                <span>Create an account. </span>
                <button className="btn btn-light" onClick={handleSignupClick}>Sign Up</button>
        
            </div>
        </div>

    )
}

export default Login;