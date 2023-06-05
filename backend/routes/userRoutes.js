const express = require('express')

const router = express.Router()

const {registerUser, loginUser, updateUser, deleteUser, userInfo, getUser} = require('../controllers/userController')

const multer = require('multer')
const path = require('path')


const requireAuth = require('../middlewares/requireAuth')
const adminAuth = require('../middlewares/adminAuth')
//setup storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'public', 'userImages')); //specify folder to save uploaded images
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

//profile route
router.get('/profile', requireAuth, userInfo)

//get user
router.get('/user/:id', getUser)

//sign up route
router.post('/signup', upload.single('image'), registerUser)

//login route
router.post('/login', loginUser)

//updateUser route
router.put('/updateUser', updateUser)

//deleteUser Route
router.delete('/deleteUser/:id', adminAuth, deleteUser)

module.exports = router;