const express = require('express')
const router = express.Router()


//import landingpage function from indexController
const landingPage = require('../controllers/indexController')



const {getBlogs, addBlog, getBlog} = require('../controllers/blogController')

//get landing page
router.get('/', landingPage)

//get blogs page
router.get('/blogs', getBlogs)


//get a single blog
router.get('/blogs/:id', getBlog)

//post a new blog
router.post('/blogs', addBlog)



module.exports = router;