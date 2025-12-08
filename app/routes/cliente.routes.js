const router = require('express').Router();
const clienteController = require('../controllers/ClienteController.js');

// Rotas RESTful para o recurso 'clientes'
router.get('/clientes', clienteController.index);
router.get('/clientes/:id', clienteController.show);
router.post('/clientes', clienteController.store);
router.put('/clientes/:id', clienteController.update);
router.delete('/clientes/:id', clienteController.destroy);

module.exports = router;