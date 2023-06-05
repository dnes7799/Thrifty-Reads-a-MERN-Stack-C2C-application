import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect, useState } from 'react'
import BooksList from './BooksList'
import LoggedoutBooksList from './LoggedoutBooksList'
import { Link } from 'react-router-dom'
//components
import Footer from "./Footer"

//css
import '../styles/home.css'
import '../styles/loggedinhome.css'

//svgs
import manReading from "../img/Man_reading.svg"
import addBooks from "../img/add_books.svg"
import requestIcon from "../img/request_for_books.svg"
import messageIcon from "../img/chat_with_seller.svg"
import cartIcon from "../img/cart-default.svg"
import ConnectWorld from "../img/Connected_world-rafiki_1_svg.svg"


const Home = () => {
    const { user } = useAuthContext()
    const [books, setBooks] = useState([])
    const [recommendation, setRecommendation] = useState([])

    const [novel, setNovel] = useState([])
    const [philosophy, setPhilosophy] = useState([])

    const [science, setScience] = useState([])
    const [literature, setLiterature] = useState([])

    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    useEffect(() => {

        const fetchBooks = async () => {
            const response = await fetch('/books')
            const json = await response.json()

            if (response.ok) {
                const allbooks = json.slice(0, 4)
                const novels = json.filter(book => book.category === 'Novel');
                const philosophy = json.filter(book => book.category === 'Philosophy')

                const science = json.filter(book => book.category === 'Science')
                const literature = json.filter(book => book.category === 'Literature')


                if (user) {

                    const interests = user.interests;
                    const length = interests.length;

                    var recommendedBooks;
                    switch (length) {
                        case 1:
                            recommendedBooks = json.filter(book => book.category === interests[0])
                            break;
                        case 2:
                            recommendedBooks = json.filter(book => book.category === interests[0] || book.category === interests[1])
                            break;
                        case 3:
                            recommendedBooks = json.filter(book => book.category === interests[0] || book.category === interests[1] || book.category === interests[2])
                            break;
                        case 4:
                            recommendedBooks = json.filter(book => book.category === interests[0] || book.category === interests[1] || book.category === interests[2] || book.category === interests[3])
                            break;
                        case 5:
                            recommendedBooks = json.filter(book => book.category === interests[0] || book.category === interests[1] || book.category === interests[2] || book.category === interests[3] || book.category === interests[4])
                            break;
                        case 6:
                            recommendedBooks = json.filter(book => book.category === interests[0] || book.category === interests[1] || book.category === interests[2] || book.category === interests[3] || book.category === interests[4] || book.category === interests[5])
                            break;
                        default:
                            break;

                    }
                }


                // get the first 4 books
                const firstFourNovels = novels.slice(0, 4)
                const firstFourPhilosophy = philosophy.slice(0, 4)

                const firstFourScience = science.slice(0, 4)
                const firstFourLiterature = literature.slice(0, 4)

                recommendedBooks = shuffleArray(recommendedBooks)

                const firstFourRecommendation = recommendedBooks.slice(0, 4)

                setRecommendation(firstFourRecommendation)

                setBooks(allbooks);

                setNovel(firstFourNovels)
                setPhilosophy(firstFourPhilosophy)

                setScience(firstFourScience)
                setLiterature(firstFourLiterature)

            }
        }
        fetchBooks()

    }, [user])



    return (
        <div className="home">
            {user ?
                //home page when the user is logged in
                <div>
                    <div className='container'>
                        <div className="book-con">
                            <div className="sell-books">
                                <div className="overlay">
                                    <h4>“You're not done with books untill you pass it to the another reader”</h4>
                                    <p>-Dylon Miller</p>
                                    <Link to="post-book">Sell your Books</Link>
                                </div>

                            </div>
                            <div className="latest">
                                <h3>Recently Added</h3>

                                <div className="book-image">
                                    <BooksList books={books} />
                                </div>

                            </div>
                        </div>

                        <div className="book-container">
                            <div className="recommend">
                                <h3>Recommended</h3>
                                <div className="book-image">
                                    <BooksList books={recommendation} />
                                </div>
                            </div>
                            <div className="sale">
                                <h3>Popular</h3>
                                <div className="book-image">
                                    <BooksList books={books} />
                                </div>
                            </div>
                            <div className="category">
                                <div className="cat-icon">
                                    <h3>Categories</h3>
                                </div>
                                <div className="category-body">
                                    <div className="novel">
                                        <h3>Novels</h3>
                                        <div className="book-image">
                                            <BooksList books={novel} />

                                        </div>
                                    </div>
                                    <div className="philosophy">
                                        <h3>Philosophy</h3>
                                        <div className="book-image">
                                            <BooksList books={philosophy} />

                                        </div>
                                    </div>

                                    <div className="science">
                                        <h3>Science</h3>
                                        <div className="book-image">
                                            <BooksList books={science} />

                                        </div>
                                    </div>
                                    <div className="literature">
                                        <h3>Literature</h3>
                                        <div className="book-image">
                                            <BooksList books={literature} />

                                        </div>
                                    </div>



                                </div>

                                <div className="button">
                                    <a className="btn" href="/books">Browse all</a>
                                </div>

                            </div>

                        </div>
                    </div>
                    <Footer />
                </div>

                //end of logged in home page

                :




                //home page when the user is not logged in
                <div>
                    <div className="loggedout-home text-body">
                        <div className="upper-body">
                            <div className="man-reading">
                                <img src={manReading} alt="" />
                            </div>
                            <div className="reading-text">
                                <h2>Your go-to destination for second-hand b<span>oo</span>ks</h2>
                                <p>
                                    Embark on a literary adventure like never before! Discover rare treasures, connect with passionate readers, and unlock the power of storytelling on our dynamic book exchange platform. Join us today and let the magic of words ignite your imagination.</p>
                                <div className="btn">
                                    <button className="explore">Explore</button>
                                    <button className="start">Get Started</button>

                                </div>
                            </div>
                        </div>
                        <div className="bg-body">
                            <div className="middle-body">
                                <h2>Our services</h2>
                                <div className="text">
                                    <div>
                                        <div className="many">
                                            <img src={addBooks} alt="" />
                                        </div>
                                        <h3>Add book for sale</h3>
                                        <p>Share your literary gems. Add Your Books for Sale Today!</p>
                                    </div>
                                    <div>
                                        <div className="many">
                                            <img src={requestIcon} alt="" />
                                        </div>
                                        <h3>Request for books</h3>
                                        <p>Seek, request, discover: Books await you!</p>
                                    </div>
                                    <div>
                                        <div className="many">
                                            <img src={messageIcon} alt="" />
                                        </div>
                                        <h3>Chat with seller </h3>
                                        <p>Connect, converse, seal the deal! Chat with sellers on our platform.</p>
                                    </div>
                                    <div>
                                        <div className="many">
                                            <img src={cartIcon} alt="" />
                                        </div>
                                        <h3>Buy at cheap price</h3>
                                        <p>Unbeatable prices, limitless reads. Buy books at pocket-friendly rates.</p>
                                    </div>
                                </div>
                                <div>
                                    <button>View Details</button>
                                </div>
                            </div>

                        </div>


                        <div className="third-body">
                            <div className="connect">
                                <img src={ConnectWorld} alt="" />
                            </div>
                            <div className="connect-text">
                                <h2>Thrifty Reads <span>Blog</span></h2>
                                <p>
                                    Are you an avid reader looking for your next literary adventure? Our platform offers a wealth of content on all things book-related, from reviews and recommendations to author interviews and industry news. Whether you're a fan of romance, mystery, sci-fi, or literary fiction, our team of passionate readers has got you covered. We're constantly exploring the latest releases and hidden gems, sharing our thoughts and insights with our community of fellow book-lovers. So come on in, grab a cup of tea, and immerse yourself in the wonderful world of books!
                                </p>
                                <button>Blogs</button>

                            </div>
                        </div>

                        <div className="lower-body">
                            <div className="latest">
                                <h3>Recently added</h3>

                                <div className='books-image'>
                                    <LoggedoutBooksList books={books} />
                                </div>

                            </div>
                            <div className="btn">
                                <button>Browse all</button>
                            </div>
                        </div>

                    </div>
                    <Footer />
                </div>
            }
        </div>
    )
}

export default Home;