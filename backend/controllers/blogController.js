//models
const mongoose = require('mongoose')
const Blog = require('../models/blogModel')
const multer = require('multer')
const path = require('path')

//setup storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'public')); //specify folder to save uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
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

//get all blogs
const getBlogs = async (req, res) => {
    const blogs = await Blog.find({}).sort({ createdAt: -1 })
    res.status(200).json(blogs)
}

//get a single blog
const getBlog = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json("This blog is not currently available. Please come later.")
    }
    const blog = await Blog.findById(id)
    if (!blog) {
        return res.status(404).json("This blog is not currently avaible.")
    }
    res.status(200).json(blog)
}

//post a blog
const addBlog = async (req, res) => {

    console.log(req.file)
    const { title, author, text } = req.body
    //const image = req.file
    const imageName = Date.now() + path.extname(req.file.originalname)
    try {
        upload.single('image')
        try {
            const blog = await Blog.create({ title, author, text, image: imageName }) //save the image file to the database
            res.status(200).json(blog)

        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }


}

module.exports = {
    getBlogs,
    addBlog,
    getBlog
}
