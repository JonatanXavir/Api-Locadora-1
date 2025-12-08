module.exports = {
  type: 'object',
  properties: {
    data_devolucao: { type: ['string', 'null'], format: 'date', errorMessage: 'A data de devolução deve estar no formato AAAA-MM-DD ou ser nula.' },
  },
  required: [], // Nenhum campo é estritamente obrigatório na atualização
  additionalProperties: false, // Impede que outros campos (como clienteId ou filmeId) sejam enviados
};


