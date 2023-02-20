import { Link } from "react-router-dom";

const BooksList = (props) => {

    const books = props.books;

    return (
        <div className="books-list row container-fluid	">
            {books && books.map((book) => (
                <div className="card m-3 px-0 col-lg-2 col-sm-3 " key={book._id}>
                    <Link to={`/books/${book._id}`} 
                    className="text-decoration-none text-dark"
                    state={{book}}
                    >
                        <div className="card-footer text-nowrap overflow-hidden">
                            <p>{book.title}</p>
                            <p>by {book.author} </p>
                            <p> Rs. {book.price.toLocaleString("en-US")}</p>
                            <p>{book.createdAt}</p>
                        </div>
                    </Link>
                    <button type="button" className="btn btn-secondary rounded-0 border-1">Add to Cart</button>



                </div>
            ))}
        </div>
    )
}

export default BooksList;
