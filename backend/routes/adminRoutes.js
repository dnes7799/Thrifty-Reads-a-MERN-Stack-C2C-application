const express = require('express')
const router = express.Router()


const adminAuth = require('../middlewares/adminAuth')



const { adminLogin, adminDashboard, getUsersList}  = require('../controllers/adminLoginController')

router.post('/admin', adminLogin)

router.get('/admin/dashboard', adminAuth, adminDashboard)

router.get('/admin/users', adminAuth, getUsersList)

module.exports = router;

