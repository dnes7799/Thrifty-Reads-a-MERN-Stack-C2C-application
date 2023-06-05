
//models
const mongoose = require('mongoose')
const Book = require('../models/addBookModel')



//get all books
const getBooks = async (req, res) => {

    try {
        const searchQuery = req.query.search

        let books;
        if (searchQuery) {
            books = await Book.find({
                $or: [
                    { title: { $regex: searchQuery, $options: 'i' } },
                    { author: { $regex: searchQuery, $options: 'i' } },
                    { category: { $regex: searchQuery, $options: 'i' } }
                ]
            }).sort({ createdAt: -1 })
        } else {
            books = await Book.find({}).sort({ createdAt: -1 })
        }
        res.status(200).json(books)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
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
    const { title, author, publishDate, category, price, condition } = req.body

    const imageName = req.file.path.split("\\").slice(-1)

    //post documents to the database
    try {
        const userId = req.user._id
        const book = await Book.create({ title, author, publishDate, category, price, condition, img: imageName[0], user_id: userId })
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

    const oldBookData = await Book.findByIdAndUpdate({ _id: id }, { ...req.body })
    

    if (!oldBookData) {
        return res.status(404).json({ error: "This book is not available" })
    }

    const newBookData = await Book.findById({_id: id})

    res.status(200).json(newBookData)

}


module.exports = {
    getBooks,
    getBook,
    addBook,
    deleteBook,
    updateBook,
    myBook
}