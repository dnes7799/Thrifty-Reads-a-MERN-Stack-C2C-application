import { Link } from "react-router-dom";
import Logo from "../img/logo.svg"
import HamburgerMenu from "../img/hamburger_icon.svg"
import '../styles/navbar.css'

import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//import { faXmark, faUser, faMessage, faPlus, faBook, faHeart, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const [isNavExpanded, setIsNavExpanded] = useState(false)


    const navigate = useNavigate()
    const handleClick = () => {
        logout()

        navigate('')
    }

    const handleLinkClick = () => {
        setIsNavExpanded(false)
       
    }


    return (
        <div className="header">
            <div className="upper-nav">
                <div>
                    <Link to="/">
                        <div className="logo">
                            <img src={Logo} alt="Thrifty-Reads" />
                            <p>Thrifty Reads</p>
                        </div>
                    </Link>
                </div>
                <div>
                    {!user ? (
                        <div className="login">
                            <Link to="/login">
                                Login
                            </Link>
                        </div>
                    ) : <div> </div>
                    }
                </div>
            </div>
            <div className="lower-nav">
                    
                <button onClick={() => {
                    setIsNavExpanded(true)
                }} className="hamburger-button">
                    <img src={HamburgerMenu} alt="cross" />
                </button>


                <nav className={isNavExpanded ? "menu menu-expanded" : "menu"}>
                    <div className={isNavExpanded ? "menu-content expanded" : "menu-content"}>
                        <button className="cross-button" onClick={() => {
                            setIsNavExpanded(false)
                        }}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <ul className="nav">
                            <li className="first">
                                <Link to="/" onClick={handleLinkClick}>
                                    Home
                                </Link>
                            </li>
                            <li className="second">
                                <Link to="/books" onClick={handleLinkClick}>
                                    Books
                                </Link>
                            </li>
                            <li className="third" >
                                <Link to="/blogs" onClick={handleLinkClick}>
                                    Blogs
                                </Link>
                            </li>

                        </ul>
                    </div>
                </nav>

                <div>
                    <SearchBar />
                </div>
                {user ? (
                    <div>
                        <ul className="loggedin-nav">
                            <li className="nav-icon">
                                <Link to='/profile'>
                                    {/*<FontAwesomeIcon icon={faUser} />*/}
                                    My Profile
                                </Link>
                            </li>
                            <li className="nav-icon">
                                <Link to='/chat'>
                                    {/*<FontAwesomeIcon icon={faMessage} /> */}
                                    Chat
                                </Link>
                            </li>
                            <li className="nav-icon">
                                <Link to="/post-book">
                                    {/*<FontAwesomeIcon icon={faPlus} />*/}
                                    Post
                                </Link>
                            </li>
                            <li className="nav-icon">
                                <Link to="/my-books">
                                    {/*<FontAwesomeIcon icon={faBook} /> */}
                                    My Books
                                </Link>
                            </li>
                            <li className="nav-icon">
                                <Link to="/wishlist">
                                    {/*<FontAwesomeIcon icon={faHeart} /> */}
                                    Wishlist
                                </Link>

                            </li>
                            <li className="nav-icon button" onClick={handleClick}>
                                {/*<FontAwesomeIcon icon={faRightFromBracket} /> */}
                                Logout
                            </li>

                        </ul>
                    </div>
                ) : (<div className="no-user"> </div>)}

            </div>

        </div>


    )
}

export default Navbar;