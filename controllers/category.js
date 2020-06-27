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

module.exports = { category_list, category_detail };
