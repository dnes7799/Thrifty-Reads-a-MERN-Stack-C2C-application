const express = require('express')
const router = express.Router()


//import landingpage function from indexController
const landingPage = require('../controllers/indexController')

const {getBlogs, addBlog, getBlog} = require('../controllers/blogController')

const multer = require('multer')
const path = require('path')

//setup storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'public', 'blogsImages')); //specify folder to save uploaded images
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


//get landing page
router.get('/', landingPage)

//get blogs page
router.get('/blogs', getBlogs)


//get a single blog
router.get('/blogs/:id', getBlog)

//post a new blog
router.post('/blogs', upload.single('image'), addBlog)



module.exports = router;