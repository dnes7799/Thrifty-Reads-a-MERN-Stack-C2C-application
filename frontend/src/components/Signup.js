import { useState } from "react";
import '../styles/signup.css'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState('')
    const [interests, setInterests] = useState([])

    const { signup, error, isLoading } = useSignup()

    const handleInterestChange = (e) => {
        const interest = e.target.value;
        if (interests.includes(interest)) {
          setInterests(interests.filter((item) => item !== interest));
        } else {
          setInterests([...interests, interest]);
        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(interests)

        await signup(first_name, last_name, email, password, image, interests);

    }
    return (
        <div className="signin-page m-5">
            <form className="signup" onSubmit={handleSubmit} encType="multipart/form-data">
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
                <label> Image </label>
                <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setImage(e.target.files[0])}
                    name="image"
                    
                />
                <div className="interest-container">
                    <label>Interests:</label>
                    <div className="checkbox-container">
                        <input type="checkbox" value="Novel" checked={interests.includes('Novel')} onChange={handleInterestChange} />
                        <label>Novel</label>
                    </div>
                    <div className="checkbox-container">
                        <input type="checkbox" value="Philosophy" checked={interests.includes('Philosophy')} onChange={handleInterestChange} />
                        <label>Philosophy</label>
                    </div >
                    <div className="checkbox-container">
                        <input type="checkbox" value="Thriller" checked={interests.includes('Thriller')} onChange={handleInterestChange} />
                        <label>Thriller</label>
                    </div>
                    <div className="checkbox-container">
                        <input type="checkbox" value="Science" checked={interests.includes('Science')} onChange={handleInterestChange} />
                        <label>Science</label>
                    </div >
                    <div className="checkbox-container">
                        <input type="checkbox" value="Religion" checked={interests.includes('Religion')} onChange={handleInterestChange} />
                        <label>Religion</label>
                    </div>
                    <div className="checkbox-container">
                        <input type="checkbox" value="Literature" checked={interests.includes('Literature')} onChange={handleInterestChange} />
                        <label>Literature</label>
                    </div>
                </div>

                <button className="my-4" disabled={isLoading}> Signup</button>
                {error && <div className="error text-danger">{error}</div>}
            </form>
        </div>
    )
}

export default Signup;