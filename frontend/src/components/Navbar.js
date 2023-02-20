import { Link } from "react-router-dom";
import Logo from "../img/logo.svg"
import '../styles/navbar.css'

import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const navigate = useNavigate()
    const handleClick = () => {
        logout()

        navigate('')
    }

    return (
        <nav className="navbar ">
            <div className="container-fluid d-flex justify-content-around">
                <Link to="/" className="navbar-brand">
                    <span>
                        <img src={Logo} alt="Thrifty-Reads" />
                        Thrifty Reads
                    </span>
                </Link>
                <div>
                    <ul className="nav d-flex m-auto ">
                        <li className="m-2">
                            <Link to="">
                                Home
                            </Link>
                        </li>
                        <li className="m-2">
                            <Link to="/books">
                                Books
                            </Link>
                        </li>
                        <li className="m-2">
                            <Link to="/blogs">
                                Blogs
                            </Link>
                        </li>

                    </ul>
                </div>
                {user ? (
                    <div>
                        <ul className="nav m-auto d-flex flex-row">
                            <li className="m-2"><Link to='/profile'>My Profile</Link> </li>
                            <li className="m-2">
                                <Link to="/post-book">
                                    Post a book
                                </Link>
                            </li>
                            <li className="m-2">
                                <Link to="/my-books">
                                    My Books
                                </Link>
                            </li>
                            <li className="btn btn-dark m-2" onClick={handleClick}>Logout</li>

                        </ul>
                    </div>
                ) : (
                    <div>
                        <ul className="nav d-flex m-auto ">
                            <li className="m-2">
                                <Link to="/login">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>)}

            </div>
        </nav>

    )
}

export default Navbar;