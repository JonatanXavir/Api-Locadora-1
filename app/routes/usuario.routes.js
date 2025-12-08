const router = require('express').Router();
const usuarioController = require('../controllers/UsuarioController.js');

router.post('/usuarios', usuarioController.store); // Rota para criar um novo usuário
router.post('/login', usuarioController.login); // Rota para autenticação

module.exports = router;
