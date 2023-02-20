//import { useEffect, useState } from "react";
//import { useParams } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const BookDetails = () => {
    const { state } = useLocation()

    const { book } = state || {}
    //another way to fetch book data
    // const [book, setBook] = useState(null)
    // const { id } = useParams();
    // useEffect(() => {
    //     const fetchBook = async () => {
    //         const response = await fetch('/books/' + id);
    //         const json = await response.json()

    //         if (response.ok) {
    //             setBook(json)
    //         }
    //     }
    //     fetchBook()

    // }, [id])
    const navigate = useNavigate()

    const { user } = useAuthContext()

    const handleDelete = async (e) => {
        e.preventDefault()
        if (!user) {
            return
        }
        const response = await fetch('/books/' + book._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        if (response.ok) {
            navigate('/books')
        }

    }

    return (
        <div>
            <div className="product-details card m-4">
                {book && (
                    <div className="card-footer text-nowrap overflow-hidden">
                        <p className="fw-bold">{book.title}</p>
                        <p>by {book.author} </p>
                        <p> Rs. {book.price.toLocaleString("en-US")}</p>
                        <p>{book.createdAt}</p>
                        <button type="button" className="btn btn-secondary rounded-0 border-1">Add to Cart</button>
                        <div className="delete-button d-flex flex-row-reverse">
                            <button className="btn btn-light" onClick={handleDelete}>Delete</button>
                        </div>

                    </div>

                )}
            </div>
            <div className="user-details card m-4">
                {user && (
                    <div className="card-footer">
                        <p>This is a seller description section</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BookDetails;