const express = require('express')
const router = express()

const requireAuth = require('../middlewares/requireAuth')

const {getWishlist, addToWishlist, removeFromWishlist} = require('../controllers/wishlistController')

router.use(requireAuth)

router.get('/wishlist', getWishlist)

router.post('/wishlist', addToWishlist)

router.delete('/wishlist/:id', removeFromWishlist)

module.exports = router;