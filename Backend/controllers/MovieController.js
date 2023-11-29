const Movie = require('../models/Movie')

const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")

module.exports = class MovieController {

    //create a product
    static async create(req, res) {
        // res.json({ message: "Deu certo!" })
        const { name, sinopse, dataLancamento } = req.body

        const available = true

        //validations
        if(!name){
            res.status(422).json({message: "O nome é obrigatório!"})
        }
        if(!sinopse){
            res.status(422).json({message: "A sinopse é obrigatória!"})
        }
        if(!dataLancamento){
            res.status(422).json({message: "A data de lançamento é obrigatória!"})
        }
        //get Movie owner
        const token = getToken(req)
        const user = await getUserByToken(token)

        const dataLan = new Date(dataLancamento)
        //create a Movie
        const movie = new Movie({
            name,
            sinopse,
            dataLancamento: dataLan,
            user:{
                _id: user.id,
                name: user.name,
                phone: user.phone,
            },
        })

     
        try {
            const newMovie = await movie.save()
            res.status(201).json({
                message: 'Filme cadastrado com sucesso!',
                newMovie
            })
        } catch (error) {
            res.status(500).json({message: error})
        }
    }    
    
    static async getAll(req, res){
        //manda os produtos mais novos
        const movies = await Movie.find().sort('-createdAt')

        res.status(200).json({
            movies: movies 
        })
    }
}