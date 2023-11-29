const Movie = require('../models/Movie')
const { default: mongoose } = require('mongoose')
const { ObjectId } = require('mongodb')

const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")

module.exports = class MovieController {

    //create a filmes
    static async create(req, res) {
        // res.json({ message: "Deu certo!" })
        const { name, sinopse, dataLancamento } = req.body

        const available = true

        //validations
        if (!name) {
            res.status(422).json({ message: "O nome é obrigatório!" })
        }
        if (!sinopse) {
            res.status(422).json({ message: "A sinopse é obrigatória!" })
        }
        if (!dataLancamento) {
            res.status(422).json({ message: "A data de lançamento é obrigatória!" })
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
            user: {
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
            res.status(500).json({ message: error })
        }
    }

    static async getAll(req, res) {
        //manda os filmes mais novos
        const movies = await Movie.find().sort('-createdAt')

        res.status(200).json({
            movies: movies
        })
    }
    static async getMovieById(req, res) {

        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(422).json({ message: "Id Invalido" })
            return
        }
        //verifica se o filme existe
        const movie = await Movie.findById(id)

        if (!movie) {
            res.status(404).json({ message: 'Filme não encontrado' })
        }

        res.status(200).json({ movie })

    }
    static async removeMovieById(req, res) {
        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(422).json({ message: "Id Invalido" })
            return
        }

        //verifica se o filme existe
        const movie = await Movie.findOne({ _id: id })

        if (!movie) {
            res.status(404).json({ message: 'filme não encontrado ' })
        }
        await Movie.findByIdAndDelete(id)
        res.status(200).json({ message: 'filme removido' })

    }
    static async updateMovie(req, res) {
        const id = req.params.id
        const { name, sinopse, dataLancamento } = req.body

        const updateData = {}

        //verifica se o filme existe
        const movie = await Movie.findOne({ _id: id })

        if (!movie) {
            res.status(404).json({ message: 'Filme não encontrado ' })
            return
        }
        //validations
        if (!name) {
            res.status(422).json({ message: "O nome é obrigatório!" })
        } else {
            updateData.name = name
        }
        if (!sinopse) {
            res.status(422).json({ message: "A sinopse é obrigatória!" })
        } else {
            updateData.sinopse = sinopse
        }
        if (!dataLancamento) {
            res.status(422).json({ message: "A data de lançamento é obrigatória!" })
        } else {
            updateData.dataLancamento = dataLancamento
        }

        // Atualiza os dados do filme no banco de dados
        const updatedMovie = await Movie.findByIdAndUpdate(id, updateData, { new: true })

        res.status(200).json({ message: 'Filme atualizado', updatedMovie })
    } catch(error) {
        res.status(500).json({ message: 'Ocorreu um erro ao atualizar o filme' })

    }
}