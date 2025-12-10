const Sequelize = require('sequelize');
const db = require('./conexao.js');

const Filme = db.define('filme', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  titulo: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  diretor: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  genero: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  anoLancamento: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  disponivel: {
    type: Sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

module.exports = Filme;