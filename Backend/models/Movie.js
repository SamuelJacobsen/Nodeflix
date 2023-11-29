const mongoose = require('../db/conn')
const { Schema } = mongoose

const Movie = mongoose.model(
    'Movie',
    new Schema({
        name: {
            type: String,
            required: true
        },
        sinopse: {
            type: String,
            required: true
        },
        dataLancamento: {
            type: Date,
            required: true
        }


    }, { timestamps: true },
    )
)
module.exports = Movie