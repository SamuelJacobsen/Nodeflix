const express = require('express');
const cors = require('cors'); // Importe o pacote CORS

const app = express();

app.use(cors()); // Configuração do CORS para permitir todas as origens

app.use(express.json());

const UserRoutes = require('./routes/UserRoutes');
const MovieRoutes = require('./routes/MovieRoutes');

app.use('/users', UserRoutes);
app.use('/movies', MovieRoutes);

app.listen(8080, () => {
    console.log('Servidor está rodando na porta 8080');
});
