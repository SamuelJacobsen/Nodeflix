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
        },
        User: {
            //alteração para salvar somente o id do usuario 
            type: Schema.Types.ObjectId,
            ref: 'User'
        },


    }, { timestamps: true },
    )
)
module.exports = Movie