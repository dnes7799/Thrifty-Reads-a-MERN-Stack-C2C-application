import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import LoginPageImage from "../img/login_page_image.svg"
import Footer from "./Footer"
import '../styles/login.css'
import { Link } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()


    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    
    return (
        <div>
            <div className="login-body">
                <div className="login-image">
                    <img src={LoginPageImage} alt="login-page" />
                </div>
                <div className="login-text">
                    <h5>WELCOME TO <span style={{ color: "blue" }}>THRIFTY READS </span></h5>
                    <div className="box">
                        <form onSubmit={handleSubmit}>
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
                    <div className="create-account">
                        <label>Don't have an account?</label>
                        <Link to="/signup">Sign up</Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>


    )
}

export default Login;