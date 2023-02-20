//import .env file
require("dotenv").config();

//import routes
const bookRoutes = require('./routes/booksRoutes')
const indexRoute = require('./routes/indexRoutes')
const userRoutes = require('./routes/userRoutes')


//database
const mongoose = require('mongoose')

//express app
const express = require('express');
const app = express();


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
app.use('/public ', express.static('public'));


//routes
app.use(indexRoute)
app.use(userRoutes)
app.use(bookRoutes)

//connection to database
mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, ()=> {
            console.log("connected to db and listenig to port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log("Database connectino failed. Exiting now...")
        console.log(error)
        process.exit(1);
    })
 

