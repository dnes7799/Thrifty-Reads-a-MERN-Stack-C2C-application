import { useLocation } from "react-router-dom";


const BlogDetails = () => {

    const { state } = useLocation()

    const { blog } = state || null

    console.log(blog.title)
    return (
        <div >
            {blog &&
                <div className="blog-details-container m-3">
                    <div className="blog-image-text d-flex justify-content-around">
                        <div className="image">
                            image container
                        </div>
                        <div className="text">
                            <h3>{blog.title}</h3>
                            <p>{blog.author}</p>
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