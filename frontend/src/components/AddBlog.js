import { useState } from "react";
import { useNavigate } from "react-router-dom"


const AddBlog = () => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    
    const handleImageChange = (e) => {
        const img = e.target.files[0];
        setImage(img)

    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('text', text);
        formData.append('image', image);

        const response = await fetch('/blogs', {
            method: 'POST',
            body: formData
           
        })
        const json = await response.json()
        
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('')
            setAuthor('')
            setText('')
            setImage('')
            setError(null)
            navigate('/blogs')
        }


    }

    return (
        <div className="add-blog-fom">
            <form className="m-3" encType="multipart/form-data" onSubmit={handleSubmit}>
                <label className="form-label">Title: </label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                />
                <label className="form-label">Author: </label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}
                    required
                />
                <label className="form-label">Text: </label>
                <textarea
                    className="form-control"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    required
                />
                <label className="form-label">Image: </label>
                <input
                    type="file"
                    className="form-control"
                    onChange={handleImageChange}
                    name="image"
                    required
                />
                <button className="btn btn-secondary my-3">Add</button>

                {error &&
                    <div className="error text-danger">
                        {error}
                    </div>}

            </form>
        </div>
    )
}

export default AddBlog;
