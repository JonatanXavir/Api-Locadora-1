const router = require('express').Router();
const usuarioController = require('../controllers/UsuarioController.js');

router.post('/usuarios', (req, res) => usuarioController.store(req, res)); // Rota para criar um novo usuário
router.post('/login', (req, res) => usuarioController.login(req, res)); // Rota para autenticação

module.exports = router;
