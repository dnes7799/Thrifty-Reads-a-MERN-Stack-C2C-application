import { useLocation } from "react-router-dom";
import '../styles/blogdetails.css'

const BlogDetails = () => {

    const { state } = useLocation()

    const { blog } = state || null

    console.log(blog.title)
    return (
        <div >
            {blog &&
                <div className="blog-details">
                    <div className="blog-image-text">
                        <div className="image">
                            <img src={`http://localhost:8000/public/${blog.image}`} alt='blog-pic' />

                        </div>
                        <div className="text">
                            <h3>{blog.title}</h3>
                            <p>By: {blog.author}</p>
                        </div>

                    </div>
                    <div className="blog-content">
                        <p>{blog.text}</p>
                    </div>

                </div>
            }
        </div>
    );
}

export default BlogDetails;