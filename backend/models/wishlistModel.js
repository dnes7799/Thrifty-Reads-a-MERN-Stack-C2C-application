const mongoose = require('mongoose')

const Schema  = mongoose.Schema

const wishlistSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    isAvailable: {
        type: Boolean,
        default : true
    }
}, {timestamps: true})

module.exports = mongoose.model('Wishlist', wishlistSchema)