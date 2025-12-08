const Sequelize = require('sequelize');
const db = require('./conexao.js');

const Cliente = db.define('cliente', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(255),
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  cpf: {
    type: Sequelize.STRING(11),
    allowNull: false,
    unique: true,
  },
  telefone: {
    type: Sequelize.STRING(15),
    allowNull: true,
  },
  endereco: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Cliente;
