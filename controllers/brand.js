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

module.exports = {
  brand_list,
  brand_detail,
};
