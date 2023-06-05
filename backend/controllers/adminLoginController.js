const User = require('../models/userModel')
const mongoose = require('mongoose')

//import .env file
require("dotenv").config();

//import json web tokens
const jwt = require('jsonwebtoken')


//import hashing library to hash the password
const bcrypt = require('bcryptjs')


const adminLogin = async (req, res) => {
    try {
        console.log("admin login called")

        //get user input
        const { email, password } = req.body

        //user input validation
        if (!(email && password)) {
            return res.status(400).json({
                message: "All inputs required"
            })
        }
        //validate if the user  exists
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ error: "There is no user with that email address." })
        }
        if (user) {
            await bcrypt.compare(password, user.password).then((result) => {
                if (result) {
                    const maxAge = 2 * 60 * 60;
                    const token = jwt.sign(
                        { id: user._id, email, role: user.role },
                        process.env.jwtSecret,
                        {
                            expiresIn: maxAge
                        }
                    )
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000
                    })

                    res.status(200).json({
                        message: "Login successful",
                        email,
                        token,
                        id: user._id,
                        role: user.role
                    })

                }
                else {
                    res.status(400).json({ error: "Password is not correct" })
                }

            })
        }

    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        })
    }

}

const adminDashboard = async (req, res) => {
    res.status(200).json({ msg: "this is admin dashboard page" })
}

const getUsersList = async (req, res) => {
    // Only admins can access this route.
    const users = await User.find({});
    res.json(users);
}

module.exports = {
    adminLogin,
    adminDashboard,
    getUsersList
}