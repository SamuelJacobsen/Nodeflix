const router = require('express').Router()

const MovieController = require('../controllers/MovieController')
const verifyToken = require('../helpers/verify-token')

router.post('/create', verifyToken, MovieController.create)
router.get('/', MovieController.getAll)
router.get('/:id', MovieController.getMovieById)
router.delete('/:id', verifyToken, MovieController.removeMovieById)
module.exports = router