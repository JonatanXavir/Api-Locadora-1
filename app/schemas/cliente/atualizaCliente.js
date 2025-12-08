module.exports = {
  type: 'object',
  properties: {
    nome: { type: 'string', minLength: 3, maxLength: 255, errorMessage: 'O nome deve ter entre 3 e 255 caracteres.' },
    email: { type: 'string', format: 'email', errorMessage: 'Deve ser um endereço de e-mail válido.' },
    telefone: { type: 'string', maxLength: 15, pattern: '^[0-9]+$', errorMessage: 'O telefone deve conter apenas números.' },
    endereco: { type: 'string', errorMessage: 'O endereço deve ser um texto.' },
  },
  required: [], // Nenhum campo é obrigatório na atualização
  additionalProperties: false, // Impede que campos como 'cpf' sejam alterados
};