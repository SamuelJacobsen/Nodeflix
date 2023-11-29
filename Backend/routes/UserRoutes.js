const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const MovieController = require('../controllers/MovieController')
const verifyToken = require('../helpers/verify-token')
// router.get('/', UserController.getAllUsers);

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', verifyToken, UserController.editUser)
router.delete('/:id', verifyToken, MovieController.removeMovieById)

module.exports = router