import { Link } from "react-router-dom";
import '../styles/loggedinhome.css'
const BooksList = (props) => {

    const books = props.books;

    return (
        <div className="book-image">
            {books && books.map((book) => (
                <div key={book._id}>
                    <Link to={`/books/${book._id}`}
                        state={{ book }}
                    >
                        <div className="each-book">
                            <img src={`http://localhost:8000/public/${book.img}`} alt="book" />
                            <h4>{book.title}</h4>
                            <p>Rs. {book.price.toLocaleString("en-US")}</p>
                        </div>
                    </Link>

                </div>
            ))}
        </div>
    )
}

export default BooksList;
