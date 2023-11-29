const express = require('express');
const app = express();

app.use(express.json());
const UserRoutes = require('./routes/UserRoutes')
const MovieRoutes = require('./routes/MovieRoutes')

app.use('/users', UserRoutes)
app.use('/movies', MovieRoutes)

app.listen(3000, () => {
    console.log('Servidor está rodando na porta 3000');
})