const express = require('express');
const app = express();

app.use(express.json());
const UserRoutes = require('./routes/UserRoutes')

app.use('/users', UserRoutes)

app.listen(3000, () => {
    console.log('Servidor está rodando na porta 3000');
})