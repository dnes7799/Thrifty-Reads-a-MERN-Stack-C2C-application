const express = require('express')

const router = express.Router()

const {newMessage, getMessage} = require('../controllers/messageController')

const requireAuth  = require('../middlewares/requireAuth')

router.use(requireAuth)

router.post('/messages', newMessage)

router.get('/messages/:chatId', getMessage)

module.exports = router;