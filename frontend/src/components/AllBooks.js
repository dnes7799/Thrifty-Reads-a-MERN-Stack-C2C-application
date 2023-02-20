import { useState, useEffect } from "react"
import BooksList from "./BooksList"

const AllBooks = () => {

    const [books, setBooks] = useState(null)

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('/books')

            const json = await response.json()

            if (response.ok) {
                setBooks(json)
            }
        }
        fetchBooks()


    }, [])

    return (
        <div className="all-books-page">
            {books && <BooksList books={books} />}

        </div>

    )
}

export default AllBooks;