require('dotenv').config();
const express = require('express');
const config = require('./config.js');
const cors = require('cors');
const app = express();
//PRE-CONFIGURACAO
app.use(express.json()); //parser dados de requisicoes em JSON
app.use(
  cors({
    origin: '*',
  })
);

//BANCO DE DADOS
const conexao = require('./app/models'); //inicializa a config do BD com sequelize

//ROTAS
app.get('/', (request, response) => {
  response.json({
    message: 'API de Locadora de Filmes',
    version: '1.0',
  });
});

// Renomeando e ajustando as importações de rotas
const clienteRotas = require('./app/routes/cliente.routes.js');
const usuarioRotas = require('./app/routes/usuario.routes.js');
const filmeRotas = require('./app/routes/filme.routes.js');
const aluguelRotas = require('./app/routes/aluguel.routes.js');

app.use(clienteRotas);
app.use(usuarioRotas);
app.use(filmeRotas);
app.use(aluguelRotas);

//RODANDO SERVER
app.listen(config.port, () => {
  console.log('servidor on-line');
});
