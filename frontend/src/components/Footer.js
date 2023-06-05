import Logo from "../img/logo.svg"
import Facebook from "../img/facebook_icon.svg"
import Instagram from "../img/insta_icon.svg"
import Twitter from "../img/twitter_image.svg"
import Mail from "../img/mail_icon.svg"
import '../styles/footer.css'

const Footer = () => {
    return(
        <div className="footer">
<footer>
                <div className="footer-body">
                    <div className="footer-logo">
                        <div><img src={Logo} alt="logo" /></div>
                        <p> Thrifty books</p>
                    </div>
                    <div className="about">
                        <h2>About Us</h2>
                        <p>Seamless platform for book enthusiasts to effortlessly buy and sell their favorite reads, fostering a vibrant community of literary exchanges.</p>
                    </div>
                    <div className="social-icons">
                        <h2>Contact Us</h2>
                        <a href="facebook.com">
                            <img src={Facebook} alt="fb-icon" />
                        </a>
                        <a href="instagram.com">
                            <img src={Instagram} alt="insta-icon" />
                        </a>
                        <a href="twitter.com">
                            <img src={Twitter} alt="twitter-icon" />
                        </a>
                        <a href="gmail.com">
                            <img src={Mail} alt="mail-icon" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;