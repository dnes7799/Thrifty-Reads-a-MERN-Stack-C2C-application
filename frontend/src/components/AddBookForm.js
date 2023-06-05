import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";

const AddBookForm = () => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publishDate, setPublishDate] = useState('')
    const [category, setCategory] = useState('Novel')
    const [price, setPrice] = useState('')
    const [condition, setCondition] = useState('Used')
    const [image, setImage] = useState()
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError("You must be logged in.")
            return
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('publishDate', publishDate);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('condition', condition);
        formData.append('image', image);
        console.log(formData)
        const response = await fetch('/books/', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${user.token}`
            }

        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('')
            setAuthor('')
            setPublishDate('')
            setCategory('')
            setPrice('')
            setCondition('')
            setImage('')
            setError(null)
            navigate('/my-books');

        }
    }
    return (
        <div className="add-book-form m-4 p-2">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label className="form-label mb-0 fw-bold">Title </label>
                <input
                    type="text"
                    className="form-control mb-3"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                />

                <label className="form-label mb-0 fw-bold">Author</label>
                <input
                    type="text"
                    className="form-control mb-3"
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}
                    required
                />

                {/* <label className="form-label mb-0 fw-bold">Publish Date: </label>
                <input
                    type="Date"
                    className="form-control mb-3"
                    onChange={(e) => setPublishDate(e.target.value)}
                    value={publishDate}
                    required
                /> */}

                <label className="form-label mb-0 fw-bold">Category</label>
                <select
                    type="text"
                    className="form-select mb-3"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    required
                >
                    <option value="Novel">Novel</option>
                    <option value="Philosophy">Philosophy</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Religion">Religion</option>
                    <option value="Science">Science</option>
                    <option value="Literature">Literature</option>

                </select>

                <label className="form-label mb-0 fw-bold">Price</label>
                <input
                    type="number"
                    min="0"
                    className="form-control mb-3"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    required
                />

                <label className="form-label mb-0 fw-bold">Condition</label>
                <select
                    type="text"
                    className="form-select mb-3"
                    onChange={(e) => setCondition(e.target.value)}
                    value={condition}
                    required
                >
                    <option value="used">Used</option>
                    <option value="like-new">Like New</option>
                </select>

                <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setImage(e.target.files[0])}
                    name="image"
                    required
                />

                <button className="btn btn-secondary my-4"> Add book</button>
                {error && <div className="error text-danger">
                    {error}
                </div>}

            </form>
        </div>
    )
}

export default AddBookForm;