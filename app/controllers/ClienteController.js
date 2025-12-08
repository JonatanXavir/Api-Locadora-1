//validacao de schema
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const addErrors = require('ajv-errors');
const localize = require('ajv-i18n/localize/pt-BR');
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
addErrors(ajv); // Adiciona o plugin ajv-errors

const schemaStore = require('../schemas/cliente/novoCliente.js');
const schemaUpdate = require('../schemas/cliente/atualizaCliente.js');
const validaStore = ajv.compile(schemaStore);
const validaUpdate = ajv.compile(schemaUpdate);

//models
const { Cliente } = require('../models');

class ClienteController {
  _validar(req, res, validador) {
    const validacoes = validador(req.body);
    if (!validacoes) {
      localize.pt(validador.errors);
      const erros = validador.errors.map((e) => e.message);
      res.status(400).json({ error: 'Dados inválidos.', details: erros });
      return false;
    }
    return true;
  }

  async index(req, res) {
    try {
      const clientes = await Cliente.findAll({ order: [['nome', 'ASC']] });
      return res.json(clientes);
    } catch (error) {
      console.error('Erro ao listar clientes:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    try {
      const cliente = await Cliente.findByPk(id);
      if (cliente) {
        return res.json(cliente);
      }
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    } catch (error) {
      console.error(`Erro ao buscar cliente ${id}:`, error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async store(req, res) {
    if (!this._validar(req, res, validaStore)) return;

    try {
      const { email } = req.body;
      const clienteExistente = await Cliente.findOne({ where: { email } });
      if (clienteExistente) {
        return res.status(409).json({ error: 'Email já cadastrado.' });
      }

      const novoCliente = await Cliente.create(req.body);
      return res.status(201).json(novoCliente);
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      return res.status(500).json({ error: 'Não foi possível cadastrar o cliente.' });
    }
  }

  async update(req, res) {
    if (!this._validar(req, res, validaUpdate)) return;

    const { id } = req.params;

    try {
      const cliente = await Cliente.findByPk(id);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado.' });
      }

      const { email } = req.body;
      if (email && email !== cliente.email) {
        const clienteExistente = await Cliente.findOne({ where: { email } });
        if (clienteExistente) {
          return res.status(409).json({ error: 'Email já pertence a outro cliente.' });
        }
      }

      const clienteAtualizado = await cliente.update(req.body);
      return res.json(clienteAtualizado);
    } catch (error) {
      console.error(`Erro ao atualizar cliente ${id}:`, error);
      return res.status(500).json({ error: 'Não foi possível atualizar o cliente.' });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    try {
      const cliente = await Cliente.findByPk(id);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado.' });
      }

      await cliente.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error(`Erro ao deletar cliente ${id}:`, error);
      // Verifica se o erro é de restrição de chave estrangeira
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(409).json({
          error: 'Não é possível excluir o cliente pois ele possui aluguéis associados.',
        });
      }
      return res.status(500).json({ error: 'Não foi possível deletar o cliente.' });
    }
  }
}
module.exports = new ClienteController();
