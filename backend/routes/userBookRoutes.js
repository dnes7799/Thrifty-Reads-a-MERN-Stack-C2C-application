// //models
// const mongoose  = require('mongoose')
// const Book = require('../models/addBookModel')

// //get all books
// const getBooks = async (req, res) => {
//     const books = await Book.find({}).sort({ createdAt: -1 })
//     res.status(200).json(books)
// }

// //get a single book
// const getBook = async (req, res) => {
//     const {id} = req.params
//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json("This book is not currently available. Please come later.")
//     }

//     const book = await Book.findById(id)
//     if(!book) {
//         return res.status(404).json("This book is not currently avaible.")
//     }

//     res.status(200).json(book);

// }

// //add a new book
// const addBook = async (req, res) => {
//     const { title, author, publishDate, category, price, condition, img} = req.body

//     //post documents to the database
//     try {
//         const book = await Book.create({ title, author, publishDate, category, price, condition, img })
//         res.status(200).json(book)
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// }

// //delete a book
// const deleteBook = async (req, res) => {
//     const {id} = req.params;
//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({error: "This book was not found"})
//     }

//     const book = await Book.findByIdAndDelete(id)
//     if(!book) {
//         return res.status(404).json({error: "This book was not found"})
//     }

//     res.status(200).json(book)
// }

// //update a book
// const updateBook = async (req, res) => {
//     const {id} = req.params

//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({error: "This book is not available"})
//     }

//     const book = await Book.findByIdAndUpdate({_id: id}, {...req.body})

//     if(!book){
//         return res.status(404).json({error: "This book is not available"})
//     }

//     res.status(200).json(book)

// }


// module.exports = {
//     getBooks,
//     getBook,
//     addBook,
//     deleteBook,
//     updateBook
// }