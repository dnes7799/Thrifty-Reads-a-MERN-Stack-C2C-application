import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import '../styles/wishlist.css'

const Wishlist = () => {

    const [wishlistItems, setWishlistItems] = useState([])
    const [error, setError] = useState(null)

    const { user } = useAuthContext()

    useEffect(() => {
        try {
            const getWishlist = async (req, res) => {

                const response = await fetch('/wishlist', {
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                });
                const json = await response.json()

                if (response.ok) {
                    setWishlistItems(json)
                }

            }
            getWishlist()

        } catch (error) {
            setError({ error: error.message })
        }

    }, [user])

    const handleDelete = async (id) => {

        const response = await fetch('/wishlist/' + id, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })

        if(response.ok){
            window.location.reload()
        }
    }


    return (
        <div className="wishlist-page">
            {!wishlistItems.length > 0 && <h3>There are no books in your wish list.</h3>}
            {wishlistItems && wishlistItems.map((item) => (
                <div className="wishlist-item" key={item._id}>

                    <img src={`http://localhost:8000/public/${item.bookId.img}`} alt={`${item.bookId.title} pic`} />
                    <p>{item.bookId.title}</p>
                    <p>{item.bookId.author}</p>

                    <button onClick={() => handleDelete(item._id)}>Delete</button>

                </div>

            ))

            }
            <p className="text-danger">{error}</p>
        </div>
                

    )
}

export default Wishlist;