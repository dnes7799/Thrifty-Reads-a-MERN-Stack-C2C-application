const mongoose = require('mongoose')
const Wishlist = require('../models/wishlistModel')
const Book = require('../models/addBookModel')


const getWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        
        const wishlistItems = await Wishlist.find({ userId }).populate('bookId').sort({ createdAt: -1 })
        for (const item of wishlistItems) {
            const book = await Book.findById(item.bookId);
            if (!book) {
                await item.delete();
            }
            else if (!book.isAvailable) {
                // update the wishlist item to show that the book is unavailable
                item.isAvailable = false;
                await item.save();
            }
        }
        res.status(200).json(wishlistItems)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const addToWishlist = async (req, res) => {
    try {
        const { bookId } = req.body;
        const userId = req.user._id

        const existingItem = await Wishlist.findOne({ bookId, userId: userId })

        if (existingItem) {
            return res.status(400).json({ error: "This book has already been added to your wishlist." })
        }
        else {
            const wishlistItem = await Wishlist.create({ bookId, userId: userId })
            res.status(200).json(wishlistItem)
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const removeFromWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "This book was not found" })
        }
        const wishlistItem = await Wishlist.findOneAndDelete({ userId, _id: id })
        res.status(200).json(wishlistItem)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getWishlist,
    addToWishlist,
    removeFromWishlist
}
