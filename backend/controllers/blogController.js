//models
const mongoose = require('mongoose')
const Blog = require('../models/blogModel')

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

    const { title, author, text } = req.body

    const imageName = req.file.path.split("\\").slice(-1)

    try {
        const blog = await Blog.create({ title, author, text, image: imageName[0] }) //save the image file to the database
        res.status(200).json(blog)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

module.exports = {
    getBlogs,
    addBlog,
    getBlog
}
