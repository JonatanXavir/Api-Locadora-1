const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const addErrors = require('ajv-errors');
const localize = require('ajv-i18n/localize/pt-BR');
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
addErrors(ajv);

const schemaStore = require('../schemas/usuario/novoUsuario.js');
const schemaLogin = require('../schemas/usuario/login.js');
const validaStore = ajv.compile(schemaStore);
const validaLogin = ajv.compile(schemaLogin);

const helper = require('../commons/helper.js');
const { Usuario } = require('../models');

class UsuarioController {
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

  async store(req, res) {
    if (!this._validar(req, res, validaStore)) return;

    try {
      const usuario = {
        nome: req.body.nome || null,
        email: req.body.email,
        senha: helper.hashSenha(req.body.senha),
      };

      const data = await Usuario.create(usuario);
      data.setDataValue('senha', '');
      data.setDataValue('access_token', helper.gerarTokenAcesso(data.nome, data.id));
      return res.status(201).json(data);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ error: 'Email já cadastrado.' });
      }
      console.error('Erro ao criar usuário:', error);
      return res.status(500).json({ error: 'Não foi possível criar o usuário.' });
    }
  }

  async login(req, res) {
    if (!this._validar(req, res, validaLogin)) return;

    try {
      const dados = {
        email: req.body.email,
        senha: helper.hashSenha(req.body.senha),
      };

      const registro = await Usuario.findOne({ where: dados });

      if (!registro) {
        return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
      }
      return res.status(200).json({ access_token: helper.gerarTokenAcesso(registro.nome, registro.id) });
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}

module.exports = new UsuarioController();
