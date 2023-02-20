const express = require('express')
const router = express.Router()

const {
    getBooks,
    getBook,
    addBook,
    deleteBook,
    updateBook,
    myBook
} = require('../controllers/bookController')

const requireAuth = require('../middlewares/requireAuth')




//get all books
router.get('/books', getBooks)

//call this middleware function before proceeding to the next functions
//require auth for all book routes
router.use(requireAuth)



//get user's book
router.get('/my-books', myBook)

//get a single book
router.get('/books/:id', getBook)

//post a new book
router.post('/books', addBook)
 
//delete a book
router.delete('/books/:id', deleteBook)

//update a book
router.patch('/books/:id', updateBook)



module.exports = router;

