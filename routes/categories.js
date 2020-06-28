const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category');

router.get('/', (req, res, next) => {
  categoryController.category_list(req, res, next);
});

router.get('/category/:id', (req, res, next) => {
  categoryController.category_detail(req, res, next);
});

module.exports = router;
