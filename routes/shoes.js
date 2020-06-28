const express = require('express');
const router = express.Router();

const shoeController = require('../controllers/shoe');

router.get('/', (req, res, next) => {
  shoeController.shoe_list(req, res, next);
});

router.get('/shoe/:id', (req, res, next) => {
  shoeController.shoe_detail(req, res, next);
});

module.exports = router;
