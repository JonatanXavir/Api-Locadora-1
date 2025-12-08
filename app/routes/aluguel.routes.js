const router = require('express').Router();
const aluguelController = require('../controllers/AluguelController.js');

router.get('/alugueis', aluguelController.index);
router.get('/alugueis/:id', aluguelController.show);
router.post('/alugueis', aluguelController.store);
router.put('/alugueis/:id', aluguelController.update);
router.delete('/alugueis/:id', aluguelController.destroy);

module.exports = router;