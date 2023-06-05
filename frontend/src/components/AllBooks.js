import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import AllBooksList from "./AllBooksList"
import Footer from "./Footer"
import '../styles/allbooks.css'
import { Link } from "react-router-dom"

const AllBooks = () => {

    const [books, setBooks] = useState([])
    const [novel, setNovel] = useState([])
    const [philosophy, setPhilosophy] = useState([])

    const [thriller, setThriller] = useState([])
    const [religion, setReligion] = useState([])
    const [science, setScience] = useState([])
    const [literature, setLiterature] = useState([])

    const location = useLocation()
    const searchQuery = new URLSearchParams(location.search).get("search")


    useEffect(() => {
        const fetchBooks = async () => {
            if (searchQuery) {
                const response = await fetch(`/books?search=${searchQuery}`)
                const json = await response.json()

                if (response.ok) {
                    setBooks(json)
                }
            }
            else {
                const response = await fetch('/books')
                const json = await response.json()

                if (response.ok) {

                    const allbooks = json.slice(0, 4)
                    const novels = json.filter(book => book.category === 'Novel');
                    const philosophy = json.filter(book => book.category === 'Philosophy')
                    const thriller = json.filter(book => book.category === 'Thriller')
                    const religion = json.filter(book => book.category === 'Religion')

                    const science = json.filter(book => book.category === 'Science')
                    const literature = json.filter(book => book.category === 'Literature')

                    // get the first 4 books
                    const firstFourNovels = novels.slice(0, 4)
                    const firstFourPhilosophy = philosophy.slice(0, 4)
                    const firstFourThriller = thriller.slice(0, 4)
                    const firstFourReligion = religion.slice(0, 4)

                    const firstFourScience = science.slice(0, 4)
                    const firstFourLiterature = literature.slice(0, 4)

                    setBooks(allbooks);

                    setNovel(firstFourNovels)
                    setPhilosophy(firstFourPhilosophy)
                    setThriller(firstFourThriller)
                    setReligion(firstFourReligion)
                    setScience(firstFourScience)
                    setLiterature(firstFourLiterature)



                }

            }

        }
        fetchBooks()


    }, [location.search, searchQuery])

    return (
        <div className="all-books-page">
            {books.length > 0 ? (
                <div>
                    <div className="all-books-page-container">
                        <div className="sell-books">
                            <div className="overlay">
                                <h4>Place your books for sale on Thrifty Reads and find trusted customers on the site.</h4>

                                <Link to="/post-book" className="sell">Sell your Books</Link>
                                <Link to="" className="request"> Request a book </Link>
                            </div>

                        </div>

                        <div className="category">
                            <div className="category-body">
                                {searchQuery && 
                                    <div className="category-book">
                                    <h3>Your Search</h3>
                                    <AllBooksList books={books} />

                                </div>
                                }

                                <div className="category-book">
                                    <h3>Novels</h3>
                                    <AllBooksList books={novel} />

                                </div>
                                <div className="category-book">
                                    <h3>Philosophy</h3>
                                    <AllBooksList books={philosophy} />

                                </div>
                                <div className="category-book">
                                    <h3>Literature</h3>
                                    <AllBooksList books={literature} />

                                </div>
                                <div className="category-book">
                                    <h3>Science</h3>
                                    <AllBooksList books={science} />

                                </div>
                                <div className="category-book">
                                    <h3>Thriller</h3>
                                    <AllBooksList books={thriller} />

                                </div> <div className="category-book">
                                    <h3>Religion</h3>
                                    <AllBooksList books={religion} />

                                </div>


                            </div>

                        </div>
                    </div>
                    <Footer />
                </div>
            ) : (
                <h1 className="m-4">No books found.</h1>
            )}
        </div>

    )
}

export default AllBooks;