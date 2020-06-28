const express = require('express');
const router = express.Router();

const brandController = require('../controllers/brand');

router.get('/brand/create', brandController.brand_create_get);

router.post('/brand/create', brandController.brand_create_post);

router.get('/brand/:id/update', (req, res, next) => {
  res.send('not implemented');
});

router.post('/brand/:id/update', (req, res, next) => {
  res.send('not implemented');
});

router.get('/brand/:id/delete', (req, res, next) => {
  res.send('not implemented');
});

router.post('/brand/:id/delete', (req, res, next) => {
  res.send('not implemented');
});

router.get('/brand/:id', brandController.brand_detail);

router.get('/', brandController.brand_list);

module.exports = router;
