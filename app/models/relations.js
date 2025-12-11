//foi optado em implementar os relacionamentos em arquivo separado
//porem cada relacionamento pode ser implementado dentro de sua model separadamente
module.exports = function (models) {
  // Relacionamento: Um Cliente pode ter muitos Aluguéis
  models.Cliente.hasMany(models.Aluguel, { //UM CLIENTE PRA MUITOS ALUGEIS
    foreignKey: 'clienteId', // chave estrangeira em Aluguel CRIE ESSA COLUNA NO BANCO
    as: 'alugueis', // Alias para facilitar as consultas
  });
  models.Aluguel.belongsTo(models.Cliente, {//  UM ALUGEL PERTENCE A UM CLIENTE
    foreignKey: 'clienteId', // chave estrangeira em Aluguel CRIE ESSA COLUNA NO BANCO
    as: 'cliente',
  });

  // Relacionamento: Um Filme pode estar em muitos Aluguéis
  models.Filme.hasMany(models.Aluguel, { // UM FILME PRA MUITOS ALUGEIS
    foreignKey: 'filmeId',
    as: 'alugueis', // Alias para facilitar as consultas
  });
  models.Aluguel.belongsTo(models.Filme, { // UM ALUGEL PERTENCE A UM FILME
    foreignKey: 'filmeId', // chave estrangeira em Aluguel CRIE ESSA COLUNA NO BANCO
    as: 'filme', // Alias para facilitar as consultas
  });
};
