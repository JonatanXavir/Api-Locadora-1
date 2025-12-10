const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const addErrors = require('ajv-errors');
const localize = require('ajv-i18n/localize/pt-BR');
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
addErrors(ajv);

const schemaStore = require('../schemas/filme/novoFilme.js');
const schemaUpdate = require('../schemas/filme/atualizaFilme.js');
const validaStore = ajv.compile(schemaStore);
const validaUpdate = ajv.compile(schemaUpdate);

const { Filme } = require('../models');

class FilmeController {
  _validar(req, res, validador) {
    const validacoes = validador(req.body);
    if (validacoes) return true;

    localize(validador.errors);
    const erros = validador.errors.map((e) => e.message);
    res.status(400).json({ error: 'Dados inválidos.', details: erros });
    return false;
  }

  async index(req, res) {
    const { disponivel } = req.query;
    const where = {};
    if (disponivel !== undefined) {
      where.disponivel = disponivel === 'true';
    }

    try {
      const filmes = await Filme.findAll({ where, order: [['titulo', 'ASC']] });
      return res.json(filmes);
    } catch (error) {
      console.error('Erro ao listar filmes:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    try {
      const filme = await Filme.findByPk(id);
      if (filme) {
        return res.json(filme);
      }
      return res.status(404).json({ error: 'Filme não encontrado.' });
    } catch (error) {
      console.error(`Erro ao buscar filme ${id}:`, error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async store(req, res) {
    if (!this._validar(req, res, validaStore)) return;

    try {
      const novoFilme = await Filme.create(req.body);
      return res.status(201).json(novoFilme);
    } catch (error) {
      console.error('Erro ao criar filme:', error);
      return res.status(500).json({ error: 'Não foi possível cadastrar o filme.' });
    }
  }

  async update(req, res) {
    if (!this._validar(req, res, validaUpdate)) return;

    const { id } = req.params;

    try {
      const filme = await Filme.findByPk(id);
      if (!filme) {
        return res.status(404).json({ error: 'Filme não encontrado.' });
      }

      const filmeAtualizado = await filme.update(req.body);
      return res.json(filmeAtualizado);
    } catch (error) {
      console.error(`Erro ao atualizar filme ${id}:`, error);
      return res.status(500).json({ error: 'Não foi possível atualizar o filme.' });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    try {
      const filme = await Filme.findByPk(id);
      if (!filme) {
        return res.status(404).json({ error: 'Filme não encontrado.' });
      }

      await filme.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error(`Erro ao deletar filme ${id}:`, error);
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(409).json({
          error: 'Não é possível excluir o filme pois ele possui aluguéis associados.',
        });
      }
      return res.status(500).json({ error: 'Não foi possível deletar o filme.' });
    }
  }
}

module.exports = new FilmeController();
