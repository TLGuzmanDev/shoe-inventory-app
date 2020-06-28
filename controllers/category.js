const validator = require('express-validator');
const Category = require('../models/category');
const Shoe = require('../models/shoe');

const category_list = (req, res, next) => {
  Category.find({}, (err, categories) => {
    if (err) {
      return next(err);
    }
    res.render('category_list', {
      title: 'Categories',
      categories,
    });
  });
};

const category_detail = (req, res, next) => {
  Category.findById(req.params.id, (err, category) => {
    if (err) {
      return next(err);
    }

    if (!category) {
      const err = new Error('Category not found');
      err.status = 404;
      next(err);
      return;
    }

    Shoe.find({ category: req.params.id })
      .populate('brand category')
      .exec((err, shoe_list) => {
        if (err) {
          return next(err);
        }
        res.render('shoe_list', {
          title: category.name,
          shoes: shoe_list,
        });
      });
  });
};

const category_create_get = (req, res, next) => {
  res.render('category_form', {
    title: 'Create Category',
  });
};

const category_create_post = [
  validator.body('name', 'Invalid category name').trim().isLength({ min: 1 }),
  validator.body('name').escape(),
  (req, res, next) => {
    const errors = validator.validationResult(req);
    const category = new Category({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Create Category',
        errors: errors.array(),
        category,
      });
    } else {
      Category.findOne({ name: category.name }).exec((err, found_category) => {
        if (err) {
          next(err);
          return;
        }
        if (found_category) {
          res.redirect(found_category.url);
        } else {
          category.save((err) => {
            if (err) {
              next(err);
              return;
            }
            res.redirect(category.url);
          });
        }
      });
    }
  },
];

module.exports = {
  category_list,
  category_detail,
  category_create_get,
  category_create_post,
};
