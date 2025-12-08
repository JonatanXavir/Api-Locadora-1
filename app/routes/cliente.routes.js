const router = require('express').Router();
const clienteController = require('../controllers/ClienteController.js');

// Rotas RESTful para o recurso 'clientes'
router.get('/clientes', (req, res) => clienteController.index(req, res));
router.get('/clientes/:id', (req, res) => clienteController.show(req, res));
router.post('/clientes', (req, res) => clienteController.store(req, res));
router.put('/clientes/:id', (req, res) => clienteController.update(req, res));
router.delete('/clientes/:id', (req, res) => clienteController.destroy(req, res));

module.exports = router;