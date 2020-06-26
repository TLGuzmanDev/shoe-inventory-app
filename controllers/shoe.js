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
  Shoe.findById(req.params.id, (err, shoe) => {
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
        title: shoe.name,
        shoeInstances,
      });
    });
  });
};

const shoe_instance_detail = (req, res, next) => {
  ShoeInstance.findById(req.params.id)
    .populate({
      path: 'shoe',
      populate: {
        path: 'brand category',
      },
    })
    .exec((err, shoeInstance) => {
      if (err) {
        next(err);
        return;
      }
      if (!shoeInstance) {
        const err = new Error('ShoeInstance not found');
        err.status = 404;
        next(err);
        return;
      }
      res.render('shoeInstance_detail', {
        title: shoeInstance.shoe.name,
        shoeInstance,
      });
    });
};

module.exports = {
  shoe_list,
  shoe_detail,
  shoe_instance_detail,
};
