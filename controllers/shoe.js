const async = require('async');
const validator = require('express-validator');
const Shoe = require('../models/shoe');
const ShoeInstance = require('../models/shoeInstance');
const Brand = require('../models/brand');
const Category = require('../models/category');

const shoe_list = (req, res, next) => {
  Shoe.find({})
    .populate('brand category')
    .exec((err, shoes) => {
      if (err) {
        next(err);
        return;
      }
      res.render('shoe_list', { title: 'Shoes', shoes });
    });
};

const shoe_detail = (req, res, next) => {
  Shoe.findById(req.params.id)
    .populate('brand category')
    .exec((err, shoe) => {
      if (err) {
        next(err);
        return;
      }
      if (!shoe) {
        const err = new Error('Shoe not found');
        err.status = 404;
        next(err);
        return;
      }
      ShoeInstance.find({ shoe: shoe.id }, (err, shoeInstances) => {
        if (err) {
          next(err);
          return;
        }
        res.render('shoe_detail', {
          title: 'Shoe Information',
          shoe,
          shoeInstances,
        });
      });
    });
};

const shoe_create_get = (req, res, next) => {
  async.parallel(
    {
      brand_list: (callback) => {
        Brand.find({}, callback);
      },
      category_list: (callback) => {
        Category.find({}, callback);
      },
    },
    (err, results) => {
      if (err) {
        next(err);
        return;
      }
      res.render('shoe_form', {
        title: 'Create Shoe',
        brands: results.brand_list,
        categories: results.category_list,
      });
    }
  );
};

const shoe_create_post = [
  validator.body('name', 'Invalid shoe name').trim().isLength({ min: 3 }),

  validator.body('brand', 'Invalid shoe brand').trim().isLength({ min: 3 }),

  validator
    .body('category', 'Invalid shoe category')
    .trim()
    .isLength({ min: 3 }),

  validator
    .body('description', 'Invalid shoe description')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 3 }),

  validator.body('*').escape(),

  (req, res, next) => {
    const errors = validator.validationResult(req);

    const shoe = new Shoe({
      name: req.body.name,
      brand: req.body.brand,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
    });

    if (!errors.isEmpty()) {
      async.parallel(
        {
          brand_list: (callback) => {
            Brand.find({}, callback);
          },
          category_list: (callback) => {
            Category.find({}, callback);
          },
        },
        (err, results) => {
          if (err) {
            next(err);
            return;
          }
          res.render('shoe_form', {
            title: 'Create Shoe',
            brands: results.brand_list,
            categories: results.category_list,
            errors: errors.array(),
          });
        }
      );
      return;
    } else {
      shoe.save((err) => {
        if (err) {
          next(err);
          return;
        }
        res.redirect(shoe.url);
      });
    }
  },
];

module.exports = {
  shoe_list,
  shoe_detail,
  shoe_create_get,
  shoe_create_post,
};
