const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

app.use(cors());
app.use(express.json());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo de 100 solicitações
  message: 'Limite de solicitações excedido, por favor, tente novamente mais tarde.',
});

app.use(limiter);

const UserRoutes = require('./routes/UserRoutes');
const MovieRoutes = require('./routes/MovieRoutes');

app.use('/users', UserRoutes);
app.use('/movies', MovieRoutes);

app.listen(8080, () => {
  console.log('Servidor está rodando na porta 8080');
});
