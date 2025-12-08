const router = require('express').Router();
const aluguelController = require('../controllers/AluguelController.js');

router.get('/alugueis', (req, res) => aluguelController.index(req, res));
router.get('/alugueis/:id', (req, res) => aluguelController.show(req, res));
router.post('/alugueis', (req, res) => aluguelController.store(req, res));
router.put('/alugueis/:id', (req, res) => aluguelController.update(req, res));
router.delete('/alugueis/:id', (req, res) => aluguelController.destroy(req, res));

module.exports = router;