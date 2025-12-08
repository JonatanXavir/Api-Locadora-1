const router = require('express').Router();
const filmeController = require('../controllers/FilmeController.js');

router.get('/filmes', filmeController.index);
router.get('/filmes/:id', filmeController.show);
router.post('/filmes', filmeController.store);
router.put('/filmes/:id', filmeController.update);
router.delete('/filmes/:id', filmeController.destroy);

module.exports = router;