const Category = require('../models/category');
const Shoe = require('../models/shoe');

const category_list = (req, res, next) => {
  Category.find({}, (err, results) => {
    if (err) {
      return next(err);
    }
    res.render('category_list', { title: 'Categories', results });
  });
};

const category_detail = (req, res, next) => {
  Category.findById(req.params.id, (err, category) => {
    if (err) {
      return next(err);
    }

    Shoe.find({ category: req.params.id }, (err, shoe_list) => {
      if (err) {
        return next(err);
      }
      res.render('category_detail', { title: category.name, shoes: shoe_list });
    });
  });
};

module.exports = { category_list, category_detail };
