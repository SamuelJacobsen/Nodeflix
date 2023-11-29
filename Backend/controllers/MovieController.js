const Movie = require('../models/Movie')

module.exports = class MovieController {

    static async create(req, res) {
        res.json({ message: "Deu Boa!" })
    }

}