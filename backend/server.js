//import .env file
require("dotenv").config();



//database
const mongoose = require('mongoose')

const path = require('path')

//express app
const express = require('express');
const app = express();

//import routes

const indexRoute = require('./routes/indexRoutes')
const bookRoutes = require('./routes/booksRoutes')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const wishlistRoutes = require('./routes/wishlistRoutes')
const adminRoutes = require('./routes/adminRoutes')
//middlewares

//When handling a post request/patch request, we're sending data
//to the server because if we want to add a new book to the database
//we have to  send the data for that book document.
//we can access that from the req object only when we use this middleware
app.use(express.json())



//This shows path and req method in the console. 
// '/' = path  , 'Get' = method 
app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/public', express.static(path.join(__dirname, 'public', 'blogsImages')))

app.use('/public', express.static(path.join(__dirname, 'public', 'bookImages')))

app.use('/public', express.static(path.join(__dirname, 'public', 'userImages')))




//routes
app.use(indexRoute)
app.use(userRoutes)
app.use(bookRoutes)
app.use(chatRoutes)
app.use(messageRoutes)
app.use(wishlistRoutes)

app.use(adminRoutes)

//connection to database
mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, ()=> {
            console.log("connected to db and listening to port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log("Database connection failed. Exiting now...")
        console.log(error)
        process.exit(1);
    })
 

