const Sequelize = require('sequelize');
const db = require('./conexao.js');

const Aluguel = db.define('aluguel', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  dataAluguel: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  dataDevolucaoPrevista: {
    type: Sequelize
      .DATE,
    allowNull: false,
  },
  dataDevolucaoReal: {
    type: Sequelize.DATE,
    allowNull: true, // Fica nulo até a devolução
  },
  valor: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  // As chaves estrangeiras 'clienteId' e 'filmeId' são adicionadas automaticamente pelo Sequelize
  // ao definir as associações no arquivo relations.js
});

module.exports = Aluguel;
