//foi optado em implementar os relacionamentos em arquivo separado
//porem cada relacionamento pode ser implementado dentro de sua model separadamente
module.exports = function (models) {
  // Relacionamento: Um Cliente pode ter muitos Aluguéis
  models.Cliente.hasMany(models.Aluguel, {
    foreignKey: 'clienteId',
    as: 'alugueis', // Alias para facilitar as consultas
  });
  models.Aluguel.belongsTo(models.Cliente, {
    foreignKey: 'clienteId',
    as: 'cliente',
  });

  // Relacionamento: Um Filme pode estar em muitos Aluguéis
  models.Filme.hasMany(models.Aluguel, {
    foreignKey: 'filmeId',
  });
  models.Aluguel.belongsTo(models.Filme, {
    foreignKey: 'filmeId',
    as: 'filme',
  });
};
