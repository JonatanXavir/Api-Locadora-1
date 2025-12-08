module.exports = {
  type: 'object',
  properties: {
    clienteId: { type: 'integer', minimum: 1, errorMessage: 'O ID do cliente é obrigatório e deve ser um número válido.' },
    filmeId: { type: 'integer', minimum: 1, errorMessage: 'O ID do filme é obrigatório e deve ser um número válido.' },
    data_aluguel: { type: 'string', format: 'date', errorMessage: 'A data do aluguel é obrigatória e deve estar no formato AAAA-MM-DD.' },
    data_devolucao: { type: ['string', 'null'], format: 'date', errorMessage: 'A data de devolução deve estar no formato AAAA-MM-DD.' },
  },
  required: ['clienteId', 'filmeId', 'data_aluguel'],
  additionalProperties: false,
};


