const express = require('express')

const router = express.Router()

const {registerUser, loginUser, updateUser, deleteUser} = require('../controllers/userController')



//sign up route
router.post('/signup', registerUser)

//login route
router.post('/login', loginUser)

//updateUser route
router.put('/updateUser', updateUser)

//deleteUser Route
router.delete('/deleteUser/:id', deleteUser)

module.exports = router;