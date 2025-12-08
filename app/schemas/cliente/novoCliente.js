module.exports = {
  type: 'object',
  properties: {
    nome: { type: 'string', minLength: 3, maxLength: 255, errorMessage: 'O nome deve ter entre 3 e 255 caracteres.' },
    email: { type: 'string', format: 'email', errorMessage: 'Deve ser um endereço de e-mail válido.' },
    cpf: { type: 'string', minLength: 11, maxLength: 11, pattern: '^[0-9]{11}$', errorMessage: 'O CPF deve conter exatamente 11 dígitos numéricos.' },
    telefone: { type: 'string', maxLength: 15, pattern: '^[0-9]+$', errorMessage: 'O telefone deve conter apenas números.' },
    endereco: { type: 'string', errorMessage: 'O endereço deve ser um texto.' },
  },
  required: ['nome', 'email', 'cpf'],
  additionalProperties: false,
};
