import { useEffect, useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext'
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link } from "react-router-dom";
import '../styles/mybooks.css'

const MyBooks = () => {

    const [books, setBooks] = useState([])
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchBooks = async () => {
            //
            const response = await fetch('/my-books', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            //the data in the backend is stored and sent in json format, 
            //which becomes the array of documents from database. 
            //so, when it comes back in json format we pass that and it becomes again an 
            //array of objects where each object represent a book

            if (response.ok) {
                setBooks(json)
            }
        }
        if (user) {
            fetchBooks()
        }
    }, [user])


    return (
        <div className="my-books-page">
            {!books.length > 0 && <h3>You haven't listed any books for sale.</h3>}
            {books && books.map((book) => (
                <div className="my-books" key={book._id}>
                    <Link to={`/books/${book._id}`}
                        state={{ book }}
                    >
                        <div className="book">
                            <img src={`http://localhost:8000/public/${book.img}`} alt="book" />
                            <h4>{book.title}</h4>
                            <p>by {book.author} </p>
                            <p> Rs. {book.price.toLocaleString("en-US")}</p>
                            <p>{formatDistanceToNow(new Date(book.createdAt), { addSuffix: true })}</p>

                        </div>
                    </Link>
                </div>
            ))}

        </div>
    )
}

export default MyBooks;