import { useEffect, useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext'

const MyBooks = () => {

    const [books, setBooks] = useState(null)
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchBooks = async () => {
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

        //since we are adding user in the useEffection, we need to add it as the dependency

    }, [user])

    return (
        <div className="my-books-page">
            {books && books.map((book) => (
                <div className="card m-3" key={book._id}>
                    <div className="card-footer">
                        <p>{book.title}</p>
                        <p>by {book.author} </p>
                        <p> Rs. {book.price.toLocaleString("en-US")}</p>
                        <p>{book.createdAt}</p>

                    </div>
                </div>
            ))}

        </div>
    )
}

export default MyBooks;