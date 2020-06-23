const async = require('async');
const Shoe = require('../models/shoe');
const Brand = require('../models/brand');
const Category = require('../models/category');
const ShoeInstance = require('../models/shoeInstance');

const index = (req, res, next) => {
  async.parallel(
    {
      shoe_count: (callback) => {
        Shoe.countDocuments({}, callback);
      },
      brand_count: (callback) => {
        Brand.countDocuments({}, callback);
      },
      category_count: (callback) => {
        Category.countDocuments({}, callback);
      },
      shoeInstance_count: (callback) => {
        ShoeInstance.countDocuments({}, callback);
      },
    },
    (err, results) => {
      if (err) {
        next(err);
        return;
      }
      res.render('index', { title: 'Shoe Inventory App', data: results });
    }
  );
};

module.exports = { index };
