const Shoe = require('../models/shoe');
const ShoeInstance = require('../models/shoeInstance');

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

module.exports = {
  shoe_list,
  shoe_detail,
};
