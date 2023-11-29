const router = require('express').Router()

const MovieController = require('../controllers/MovieController')
const verifyToken = require('../helpers/verify-token')

router.post('/create', verifyToken, MovieController.create)
router.get('/', MovieController.getAll)
module.exports = router