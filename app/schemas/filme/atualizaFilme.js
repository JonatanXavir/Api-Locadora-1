module.exports = {
  type: 'object',
  properties: {
    titulo: { type: 'string', minLength: 1, maxLength: 255, errorMessage: 'O título é obrigatório.' },
    diretor: { type: 'string', minLength: 1, maxLength: 255, errorMessage: 'O nome do diretor é obrigatório.' },
    genero: { type: 'string', maxLength: 100, errorMessage: 'O gênero deve ser um texto de até 100 caracteres.' },
    anoLancamento: { type: 'integer', minimum: 1888, maximum: new Date().getFullYear() + 1, errorMessage: 'O ano de lançamento é inválido.' },
    disponivel: { type: 'boolean', errorMessage: 'O campo "disponivel" deve ser um valor booleano (true/false).' },
  },
  required: [],
  additionalProperties: false,
};