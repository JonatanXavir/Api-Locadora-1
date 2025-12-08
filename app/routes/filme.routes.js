const router = require('express').Router();
const filmeController = require('../controllers/FilmeController.js');

router.get('/filmes', (req, res) => filmeController.index(req, res));
router.get('/filmes/:id', (req, res) => filmeController.show(req, res));
router.post('/filmes', (req, res) => filmeController.store(req, res));
router.put('/filmes/:id', (req, res) => filmeController.update(req, res));
router.delete('/filmes/:id', (req, res) => filmeController.destroy(req, res));

module.exports = router;