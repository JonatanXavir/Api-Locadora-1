const conexao = require('./conexao.js');

const db = {};

//importar aqui para atribuir na lista de models e inicializar o BD:
db.Cliente = require('./Cliente.js');
db.Filme = require('./Filme.js');
db.Aluguel = require('./Aluguel.js');
db.Usuario = require('./Usuario.js').UsuarioModel; // Mantém o padrão antigo para não quebrar


//lista de associacoes
require('./relations.js')(db);

//conectando e sincronizando com BD
conexao
  .sync({}) //{ force: true } --> para forcar a recriacao do banco
  .then(() => {
    console.log('sincronizacao com bd...');
  })
  .catch((err) => {
    console.log('falha ao sincronizar: ' + err.message);
  });

module.exports = db;
