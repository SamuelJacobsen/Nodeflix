const router = require('express').Router()

const MovieController = require('../controllers/MovieController')

router.post('/create', MovieController.create)

module.exports = router