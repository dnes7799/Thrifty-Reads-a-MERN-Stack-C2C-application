import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blogs = () => {

    const [blogs, setBlogs] = useState(null)

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch('/blogs')

            const json = await response.json()

            if (response.ok) {
                setBlogs(json)
            }
        }
        fetchBlogs()
    }, [])

    return (
        <div className="blogs-page m-3">
            <div className="blogs">
                {blogs && blogs.map((blog) => (
                    
                    <div className="blog" key={blog._id}>
                        <div className="img">
                            <img src={`http://localhost:8000/public/${blog.image}`} alt='blog-pic' />
                        </div>

                        <p>{blog.title}</p>
                        <p>{blog.author}</p>
                        <Link
                            to={`/blogs/${blog._id}`}
                            state={{ blog }}
                            className="read-more-link"
                        >
                            <p> Read more...</p>
                        </Link>
                    </div>

                ))}

            </div>

            <Link to="/post-blogs">
                <p>Add your own blog</p>
            </Link>
        </div>


    )
}

export default Blogs;