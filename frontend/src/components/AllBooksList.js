import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import '../styles/allbooks.css'

const AllBooksList = (props) => {

    const books = props.books;

    return (
        <div className="all-book-container">
            {books && books.map((book) => (
                <div key={book._id}>
                    <Link to={`/books/${book._id}`}
                        state={{ book }}
                    >
                        <div className="all-book-image">
                            <img src={`http://localhost:8000/public/${book.img}`} alt="book" />
                            <h4>{book.title}</h4>
                            <p id="hide-author" >Author: {book.author} </p>
                            <p>Price:  Rs. {book.price.toLocaleString("en-US")}</p>
                            <p id="hide-date">Uploaded: {formatDistanceToNow(new Date(book.createdAt), { addSuffix: true })}</p>
                        </div>
                    </Link>


                </div>
            ))}
        </div>
    );
}

export default AllBooksList;