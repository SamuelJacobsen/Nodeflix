const router = require('express').Router()

const MovieController = require('../controllers/MovieController')
const verifyToken = require('../helpers/verify-token')

router.post('/create', verifyToken, MovieController.create)
router.get('/', MovieController.getAll)
router.get('/search', verifyToken, MovieController.search);
router.get('/:id', MovieController.getMovieById)
router.delete('/:id', verifyToken, MovieController.removeMovieById)
router.patch('/:id', verifyToken, MovieController.updateMovie)
module.exports = router

//sanitizer
//rate limit
//xss
//https
//rota para busca
