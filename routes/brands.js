const express = require('express');
const router = express.Router();

const brandController = require('../controllers/brand');

router.get('/', (req, res, next) => {
  brandController.brand_list(req, res, next);
});

router.get('/:id', (req, res, next) => {
  brandController.brand_detail(req, res, next);
});

module.exports = router;
