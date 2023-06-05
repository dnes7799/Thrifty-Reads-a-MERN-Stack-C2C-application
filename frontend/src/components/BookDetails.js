//import { useEffect, useState } from "react";
//import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Footer from './Footer.js'
import '../styles/bookinfo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const BookDetails = () => {
    const { state } = useLocation()
    const [seller, setSeller] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { user } = useAuthContext()

    const [book, setBook] = useState(state.book);

    const [title, setTitle] = useState(book.title)
    const [author, setAuthor] = useState(book.author)
    const [category, setCategory] = useState(book.category)
    const [price, setPrice] = useState(book.price)
    const [condition, setCondition] = useState(book.condition)
    const [image, setImage] = useState(book.img)


    const [text, setText] = useState("")

    const [msg, setMsg] = useState(null)

    const [showMessageModal, setShowMessageModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    useEffect(() => {
        const fetchSeller = async (req, res) => {
            const response = await fetch(`/user/${book.user_id}`, {
                // headers: {
                //     'Authorization': `Bearer ${user.token}`
                // }
            })
            const json = await response.json()
            if (!response.ok) {
                setError(json.error)
            }
            if (response.ok) {
                setSeller(json)
            }
        }
        fetchSeller()
    }, [book])

    const handleDelete = async (e) => {
        e.preventDefault()

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

    const handleEditModal = () => {
        if (user) {
            setShowEditModal(true)
        }
        else {
            setMsg("Please login to send message to this seller")
        }
    }

    const handleCloseEditModal = () => {
        setShowEditModal(false)
    }
    const handleEdit = async (e) => {
        e.preventDefault()
        console.log(price)

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('condition', condition);
        formData.append('image', image);

        var object = {};
        formData.forEach((value, key) => object[key] = value);
        var json = JSON.stringify(object);

        console.log("form Data:", formData)

        const response = await fetch('/books/' + book._id, {
            method: 'PUT',
            body: json,
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${user.token}`
            },

        });

        if (response.ok) {
            setMsg("Book Updated")
            setShowEditModal(false)
            const updatedBook = {
                ...book,
                title: title,
                author: author,
                category: category,
                price: price,
                condition: condition,
                img: image
            };
            setBook(updatedBook)

        } else {
            console.error('Something went wrong while updating the book: ', error);
        }
    }

    const handleAddToWishlist = async (e) => {

        e.preventDefault()
        if (user) {
            const item = {
                userId: user.id,
                bookId: book._id
            }

            const response = await fetch('/wishlist', {
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })

            const json = await response.json()

            if (!response.ok) {
                setError(json.error)
            }
            if (response.ok) {
                setMsg("Added to your wishlist")
            }
        } else {
            setMsg('Please login to add this book to your wishlist.')
        }

    }

    const handleShowModal = () => {
        if (user) {
            setShowMessageModal(true)
        }
        else {
            setMsg("Please login to send message to this seller")
        }
    }

    const handleCloseModal = () => {
        setShowMessageModal(false)
    }

    const handleSend = (e) => {
        e.preventDefault()

        const message = {
            senderId: user.id,
            receiverId: seller._id,
            text: text
        }

        const sendMessage = async () => {

            const response = await fetch('/chat', {
                method: 'POST',
                body: JSON.stringify(message),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })

            const json = await response.json()

            if (!response.ok) {
                setError(json.err)
            }

            if (response.ok) {
                setMsg("Message Sent")
                setShowMessageModal(false)
            }

        }
        sendMessage()

    }



    return (
        <div>
            <div className="book-info-page">
                <div className="group"></div>

                <div className="info-container">
                    {book && (
                        <>
                            <div className="web-info-container">
                                <div className="" >
                                    <div className="web-buy-book">
                                        <img src={`http://localhost:8000/public/${book.img}`} alt="book" />
                                        <h2>{book.title}</h2>
                                    </div >
                                    <div className="web-bookinfo">
                                        <p><span className="fw-bold">Author: </span> {book.author} </p>
                                        <p><span className="fw-bold">Condition: </span> {book.condition} </p>

                                        <p><span className="fw-bold">Uploaded: </span> {formatDistanceToNow(new Date(book.createdAt), { addSuffix: true })}</p>
                                        <p><span className="fw-bold">Price: </span>Rs {book.price.toLocaleString("en-US")}</p>
                                    </div>
                                </div >
                                <div className="more-bookimg">
                                    <img src={`http://localhost:8000/public/${book.img}`} alt="book" />
                                    <div>
                                        <span className="previous-icon"><FontAwesomeIcon icon={faChevronLeft} /></span>
                                        <span className="next-icon"><FontAwesomeIcon icon={faChevronRight} /></span>
                                    </div>

                                </div>

                            </div>
                            <div className="seller-info">
                                <div className="seller-body">
                                    <div className="seller-photo">
                                        <img src={`http://localhost:8000/public/${seller.image}`} alt="book" />
                                    </div>
                                    <div className="seller-body-text">
                                        <p>Seller Name: {seller.first_name} {seller.last_name}</p>
                                        <p>Seller Email: {seller.email}</p>
                                    </div>
                                </div>

                              
                                    <div className="">
                                        <div className="connect">
                                            <button type="button"
                                                className="message"
                                                onClick={handleShowModal}>
                                                Message
                                            </button>
                                            <Modal show={showMessageModal} onHide={handleCloseModal}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Send Message: </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <textarea
                                                        className="modal-message"
                                                        value={text}
                                                        onChange={(e) => setText(e.target.value)}
                                                        placeholder="Type your message..."
                                                    />
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleCloseModal}>
                                                        Cancel
                                                    </Button>
                                                    <Button variant="primary" onClick={handleSend}>
                                                        Send
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>

                                            <button
                                                className="wishlist"
                                                onClick={handleAddToWishlist}>
                                                Add to Wishlist
                                            </button>
                                        </div>
                                            {user && user.id === book.user_id &&
                                                <button className="delete" onClick={handleDelete}>
                                                    Delete
                                                </button>

                                            }
                                            {user && user.id === book.user_id &&
                                                <button className="edit" onClick={handleEditModal}>
                                                    Edit
                                                </button>

                                            }  <Modal show={showEditModal} onHide={handleCloseEditModal}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Edit Book Details: </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>

                                                <label className="form-label mb-0 fw-bold">Title </label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-3"
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    value={title}

                                                />

                                                <label className="form-label mb-0 fw-bold">Author</label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-3"
                                                    onChange={(e) => setAuthor(e.target.value)}
                                                    value={author}

                                                />

                                                <label className="form-label mb-0 fw-bold">Category</label>
                                                <select
                                                    type="text"
                                                    className="form-select mb-3"
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    value={category}

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

                                                />

                                                <label className="form-label mb-0 fw-bold">Condition</label>
                                                <select
                                                    type="text"
                                                    className="form-select mb-3"
                                                    onChange={(e) => setCondition(e.target.value)}
                                                    value={condition}

                                                >
                                                    <option value="used">Used</option>
                                                    <option value="like-new">Like New</option>
                                                </select>

                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    onChange={(e) => setImage(e.target.files[0])}
                                                    name="image"

                                                />

                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseEditModal}>
                                                    Cancel
                                                </Button>
                                                <Button variant="primary" onClick={handleEdit}>
                                                    Update
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                          
                                    </div>

                             


                            </div>
                            <p className="text-danger my-2">
                                {error ? error : msg}
                            </p>
                        </>

                    )}

                </div >
                {/* <div class="book-container">
                    <div class="recommend">
                        <h3>Recommended</h3>
                        <div class="book-image">
                            <BooksList books={books} />

                        </div>
                    </div>
                </div> */}

            </div>
            <Footer />
        </ div>


    )
}

export default BookDetails;