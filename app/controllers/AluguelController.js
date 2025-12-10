const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const addErrors = require('ajv-errors');
const localize = require('ajv-i18n/localize/pt-BR');
const ajv = new Ajv({ allErrors: true });
addFormats(ajv); // Adiciona suporte para format: 'date'
addErrors(ajv);

const schemaStore = require('../schemas/aluguel/novoAluguel.js');
const schemaUpdate = require('../schemas/aluguel/atualizaAluguel.js');
const validaStore = ajv.compile(schemaStore);
const validaUpdate = ajv.compile(schemaUpdate);

const { Aluguel, Cliente, Filme } = require('../models');

class AluguelController {
  /**
   * Valida o corpo da requisição contra um schema específico.
   */
  _validar(req, res, validador) {
    const validacoes = validador(req.body);
    if (validacoes) return true;

    localize.pt(validador.errors);
    const erros = validador.errors.map((e) => e.message);
    res.status(400).json({ error: 'Dados inválidos.', details: erros });
    return false;
  }

  /**
   * Lista todos os aluguéis com informações do cliente e do filme.
   */
  async index(req, res) {
    try {
      const alugueis = await Aluguel.findAll({
        include: [
          { model: Cliente, as: 'cliente' },
          { model: Filme, as: 'filme' },
        ],
        order: [['data_aluguel', 'DESC']],
      });
      return res.json(alugueis);
    } catch (error) {
      console.error('Erro ao listar aluguéis:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  /**
   * Busca um aluguel específico pelo ID.
   */
  async show(req, res) {
    try {
      const { id } = req.params;
      const aluguel = await Aluguel.findByPk(id, {
        include: [
          { model: Cliente, as: 'cliente' },
          { model: Filme, as: 'filme' },
        ],
      });

      if (!aluguel) {
        return res.status(404).json({ error: 'Aluguel não encontrado.' });
      }

      return res.json(aluguel);
    } catch (error) {
      console.error('Erro ao buscar aluguel:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  /**
   * Cria um novo registro de aluguel.
   */
  async store(req, res) {
    if (!this._validar(req, res, validaStore)) return;

    try {
      const { clienteId, filmeId, data_aluguel } = req.body;

      // Lógica de negócio: Calcular data de devolução e valor
      const dataAluguel = new Date(data_aluguel);
      const dataDevolucaoPrevista = new Date(dataAluguel);
      dataDevolucaoPrevista.setDate(dataAluguel.getDate() + 7); // Adiciona 7 dias

      const dadosParaCriar = {
        clienteId,
        filmeId,
        dataAluguel: data_aluguel, // O model espera dataAluguel (camelCase)
        dataDevolucaoPrevista,
        valor: 15.00, // Valor fixo como exemplo
      };

      const novoAluguel = await Aluguel.create(dadosParaCriar);
      return res.status(201).json(novoAluguel);
    } catch (error) {
      console.error('Erro ao criar aluguel:', error);
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(404).json({ error: 'Cliente ou Filme não encontrado.' });
      }
      return res.status(500).json({ error: 'Não foi possível registrar o aluguel.' });
    }
  }

  /**
   * Atualiza um aluguel existente (ex: registrar devolução).
   */
  async update(req, res) {
    if (!this._validar(req, res, validaUpdate)) return;

    try {
      const { id } = req.params;
      const aluguel = await Aluguel.findByPk(id);

      if (!aluguel) {
        return res.status(404).json({ error: 'Aluguel não encontrado.' });
      }

      const aluguelAtualizado = await aluguel.update(req.body);

      return res.json(aluguelAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar aluguel:', error);
      return res.status(500).json({ error: 'Não foi possível atualizar o aluguel.' });
    }
  }

  /**
   * Deleta um registro de aluguel.
   */
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const aluguel = await Aluguel.findByPk(id);

      if (!aluguel) {
        return res.status(404).json({ error: 'Aluguel não encontrado.' });
      }

      await aluguel.destroy();

      return res.status(204).send(); // 204 No Content
    } catch (error) {
      console.error('Erro ao deletar aluguel:', error);
      return res.status(500).json({ error: 'Não foi possível deletar o aluguel.' });
    }
  }
}

module.exports = new AluguelController();
