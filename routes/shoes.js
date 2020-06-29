const express = require('express');
const router = express.Router();

const shoeController = require('../controllers/shoe');

router.get('/', (req, res, next) => {
  shoeController.shoe_list(req, res, next);
});

router.get('/shoe/create', shoeController.shoe_create_get);

router.post('/shoe/create', shoeController.shoe_create_post);

router.get('/shoe/:id', (req, res, next) => {
  shoeController.shoe_detail(req, res, next);
});

router.get('/shoe/:id/create', shoeController.shoeInstance_create_get);

router.post('/shoe/:id/create', shoeController.shoeInstance_create_post);

module.exports = router;
