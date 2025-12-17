require('dotenv').config();
const express = require('express');
const config = require('./config.js');
const cors = require('cors');
const app = express();
//PRE-CONFIGURACAO
app.use(express.json()); //parser dados de requisicoes em JSON
app.use(
  cors({
        origin: 'http://localhost:5173', // Substitua pelo domínio do seu frontend
    credentials: true, // Adicione esta linha para permitir que o frontend envie credenciais (como cookies ou headers de autorização),
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

// Carregando e utilizando as rotas da aplicação
app.use(require('./app/routes/cliente.routes.js'));
app.use(require('./app/routes/usuario.routes.js'));
app.use(require('./app/routes/filme.routes.js'));
app.use(require('./app/routes/aluguel.routes.js'));

//RODANDO SERVER
app.listen(config.port, () => {
  console.log('servidor on-line');
});
