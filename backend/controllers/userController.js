//import model from userModel.js
const User = require('../models/userModel')
const mongoose = require('mongoose')
//import .env file
require("dotenv").config();

//import json web tokens
const jwt = require('jsonwebtoken')

//validate email and password
const validator = require('validator')

//import hashing library to hash the password
const bcrypt = require('bcryptjs')


//get user info - profile page

const userInfo = async (req, res) => {


    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json(user)
    }
    else {
        res.status(404).json("There is no such user")
    }

}

//get user info from user id

const getUser = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json("This user is not currently available. Please come later.")
    }
    const user = await User.findById(id)
    if (!user) {
        return res.status(404).json("This user is not currently avaible.")
    }
    else{
    res.status(200).json(user)}
}


//sign up user
const registerUser = async (req, res, next) => {

    try {
        const { first_name, last_name, email, password, interests } = req.body

        const imageName = req.file.path.split("\\").slice(-1)



        if (!first_name || !last_name || !email || !password) {
            throw Error("All inputs must be filled")
        }

        if (!validator.isEmail(email)) {
            throw Error("Email is not valid")
        }

        if (!validator.isStrongPassword(password)) {
            throw Error("Password is not strong enough")
        }

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            //return res.status(400).json("User Already Exist. Please use different email address.");
            throw Error("Email already exists.")
        }
        const salt = await bcrypt.genSalt(10)
        const encryptedUserPassword = await bcrypt.hash(password, salt);

        await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedUserPassword,
            image: imageName[0],
            interests

        }).then(user => {
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
            res.status(201).json({
                message: "User successfully created",
                email,
                token,
                id: user._id,
                role: user.role,
                interests
            })
        })
    } catch (error) {
        res.status(401).json({
            msg: "Couldn't create user. Please try again",
            error: error.message
        })
    }


}


//login user
const loginUser = async (req, res) => {
    try {
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
                        role: user.role,
                        interests: user.interests,
                        name: user.first_name + user.last_name
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




//update user
const updateUser = async (req, res) => {
    const { role, id } = req.body

    //verify if the role and id is present
    if (role && id) {
        //verify if the value of role is admin
        if (role == "admin") {
            await User.findById(id)
                .then((user) => {
                    //verify if the user is not an admin
                    if (user.role != "admin") {
                        user.role = role,
                            user.save((err) => {

                                //MongoDB error checker to check if there's an error while storing the user in database
                                if (err) {
                                    return res.status(400).json({ message: "An error occurred", error: err.message });
                                    process.exit(1)
                                }
                                return res.status(201).json({ message: "Successfully updated", user })
                            })
                    } else {
                        res.status(400).json({ message: "The user is already an admin" })
                    }
                }).catch((error) => {
                    return res.status(400).json({ message: "An error occurred", error: error.message })
                })
        } else {
            res.status(400).json({ message: "Role is not admin" })
        }
    } else {
        res.status(400).json({ message: "There were no changes." })
    }
}

//delete user
const deleteUser = async (req, res) => {
    const { id } = req.params

    const user = await User.findByIdAndDelete(id)
    // .then(user => user.remove())
    // .then(user => res.status(201).json({message: "User is removed", user}))
    // .catch(error => {
    //     return res.status(400).json({message: "An error occurred", error: error.message})
    // })
    if (!user) {
        return res.status(404).json({ error: "This user was not found" })
    }
    return res.status(200).json({ message: "User successfully deleted", user });



}

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    userInfo,
    getUser
}