const validator = require('express-validator');
const Brand = require('../models/brand');
const Shoe = require('../models/shoe');

const brand_list = (req, res, next) => {
  Brand.find({}, (err, brands) => {
    if (err) {
      next(err);
      return;
    }
    res.render('brand_list', {
      title: 'Brands',
      brands,
    });
  });
};

const brand_detail = (req, res, next) => {
  Brand.findById(req.params.id, (err, brand) => {
    if (err) {
      next(err);
      return;
    }
    if (!brand) {
      const err = new Error('Brand not found');
      err.status = 404;
      next(err);
      return;
    }
    Shoe.find({ brand: req.params.id })
      .populate('brand category')
      .exec((err, shoe_list) => {
        if (err) {
          next(err);
          return;
        }
        res.render('shoe_list', {
          title: brand.name,
          shoes: shoe_list,
        });
      });
  });
};

const brand_create_get = (req, res, next) => {
  res.render('brand_form', {
    title: 'Create Brand',
  });
};

const brand_create_post = [
  validator.body('name', 'Invalid brand name').trim().isLength({ min: 1 }),
  validator.body('founded', 'Invalid founded date').trim().isDate(),
  validator.body('name').escape(),
  validator.body('founded').escape(),
  (req, res, next) => {
    const errors = validator.validationResult(req);
    const brand = new Brand({
      name: req.body.name,
      founded: req.body.founded,
    });

    if (!errors.isEmpty()) {
      res.render('brand_form', {
        title: 'Create Brand',
        errors: errors.array(),
        brand,
      });
    } else {
      // Data from form is valid
      Brand.findOne({ name: req.body.name }).exec((err, found_brand) => {
        if (err) {
          next(err);
          return;
        }
        if (found_brand) {
          res.redirect(found_brand.url);
        } else {
          brand.save((err) => {
            if (err) {
              next(err);
              return;
            }
            res.redirect(brand.url);
          });
        }
      });
    }
  },
];
module.exports = {
  brand_list,
  brand_detail,
  brand_create_get,
  brand_create_post,
};
