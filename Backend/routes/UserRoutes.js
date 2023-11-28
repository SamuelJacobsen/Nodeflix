const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

// router.get('/', UserController.getAllUsers);

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkUser', UserController.checkUser)
module.exports = router