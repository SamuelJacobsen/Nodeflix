const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/nodeflix')
    console.log('conectou ao Mongoose!')
}

main().catch((err) => console.log(err))

module.exports = mongoose