import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import '../styles/home.css'
const BooksList = (props) => {

    const books = props.books;

    return (
        <div className="books-image">
            {books && books.map((book) => (
                <div key={book._id}>
                    <Link to={`/books/${book._id}`}
                        state={{ book }}
                    >
                        <div className="book-name">
                            <img src={`http://localhost:8000/public/${book.img}`} alt="book" />
                            <h4>{book.title}</h4>
                            <p>Author: {book.author} </p>
                            <p>Price:  Rs. {book.price.toLocaleString("en-US")}</p>
                            <p>Uploaded: {formatDistanceToNow(new Date(book.createdAt), { addSuffix: true })}</p>
                        </div>
                    </Link>

                </div>
            ))}
        </div>
    )
}

export default BooksList;
