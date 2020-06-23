const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');

/* GET home page. */
router.get('/', function (req, res, next) {
  indexController.index(req, res, next);
});

module.exports = router;
