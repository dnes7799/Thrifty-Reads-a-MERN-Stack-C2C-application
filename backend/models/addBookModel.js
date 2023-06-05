const mongoose = require('mongoose')

const Schema = mongoose.Schema

const addBookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    // publishDate: {
    //     type: Date,
    //     required: true
    // },
    category: {
        type: String,
        enum: ["Novel", "Philosophy", "Thriller", "Religion", "Science", "Literature"],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
    },

    condition: {
        type: String,
        required: true
    },
    //every book must be associated with the user
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Book', addBookSchema)