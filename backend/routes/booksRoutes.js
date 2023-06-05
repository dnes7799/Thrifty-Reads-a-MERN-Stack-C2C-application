const express = require('express')
const router = express.Router()

const {
    getBooks,
    getBook,
    addBook,
    deleteBook,
    updateBook,
    myBook,

} = require('../controllers/bookController')

const requireAuth = require('../middlewares/requireAuth')


const multer = require('multer')
const path = require('path')

//setup storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'public', 'bookImages')); //specify folder to save uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedFileTypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb(new Error('Error: Only jpeg, jpg and png images are supported.'))
    }

}

//initialize upload
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})


//get all books
router.get('/books', getBooks)

//get a single
router.get('/books/:id', getBook)


//call this middleware function before proceeding to the next functions
//require auth for all book routes
router.use(requireAuth)



//get user's book
router.get('/my-books', myBook)

//post a new book
router.post('/books', upload.single('image'), addBook)
 
//delete a book
router.delete('/books/:id', deleteBook)

//update a book
router.put('/books/:id', updateBook)



module.exports = router;

