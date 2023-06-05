const express = require('express')
const router = express.Router();

const requireAuth = require('../middlewares/requireAuth')

const {newChat, getChat} = require('../controllers/chatController')

router.use(requireAuth)

router.post('/chat', newChat)

router.get('/chat/:userId', getChat)


module.exports = router;