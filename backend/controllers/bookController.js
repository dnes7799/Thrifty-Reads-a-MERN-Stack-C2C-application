
//models
const mongoose = require('mongoose')
const Book = require('../models/addBookModel')



//get all books
const getBooks = async (req, res) => {

    const books = await Book.find({}).sort({ createdAt: -1 })
    res.status(200).json(books)

}
//get user's books
const myBook = async (req, res) => {
    const user_id = req.user._id;

    const books = await Book.find({ user_id }).sort({ createdAt: -1 })
    res.status(200).json(books)
}

//get a single book
const getBook = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json("This book is not currently available. Please come later.")
    }

    const book = await Book.findById(id)
    if (!book) {
        return res.status(404).json("This book is not currently avaible.")
    }

    res.status(200).json(book);

}

//add a new book
const addBook = async (req, res) => {
    const { title, author, publishDate, category, price, condition, img } = req.body


    //post documents to the database
    try {
        const userId = req.user._id
        const book = await Book.create({ title, author, publishDate, category, price, condition, img, user_id: userId })
        res.status(200).json(book)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete a book
const deleteBook = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "This book was not found" })
    }

    const book = await Book.findByIdAndDelete(id)
    if (!book) {
        return res.status(404).json({ error: "This book was not found" })
    }

    res.status(200).json(book)
}

//update a book
const updateBook = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "This book is not available" })
    }

    const book = await Book.findByIdAndUpdate({ _id: id }, { ...req.body })

    if (!book) {
        return res.status(404).json({ error: "This book is not available" })
    }

    res.status(200).json(book)

}


module.exports = {
    getBooks,
    getBook,
    addBook,
    deleteBook,
    updateBook, 
    myBook
}