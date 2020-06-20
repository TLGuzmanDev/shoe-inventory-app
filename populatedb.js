const async = require('async');

const Shoe = require('./models/shoe');
const Brand = require('./models/brand');
const Category = require('./models/category');
const ShoeInstance = require('./models/shoeInstance');

require('dotenv').config();
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const shoes = [];
const brands = [];
const categories = [];
const shoeInstances = [];

const brandCreate = (name, founded, cb) => {
  const brand = new Brand({ name, founded });

  brand.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Brand: ' + brand);
    brands.push(brand);
    cb(null, brand);
  });
};

const categoryCreate = (name, cb) => {
  const category = new Category({ name });

  category.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category);
    cb(null, category);
  });
};

const shoeCreate = (name, price, brand, category, cb) => {
  const shoe = new Shoe({ name, price, brand, category });

  shoe.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Shoe: ' + shoe);
    shoes.push(shoe);
    cb(null, shoe);
  });
};

const shoeInstanceCreate = (shoe, size, stock, cb) => {
  const shoeInstance = new ShoeInstance({ shoe, size, stock });

  shoeInstance.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New ShoeInstance: ' + shoeInstance);
    shoeInstances.push(shoeInstance);
    cb(null, shoeInstance);
  });
};

const creatBrandsandCategories = (cb) => {
  async.series(
    [
      (callback) => {
        categoryCreate('running', callback);
      },
      (callback) => {
        categoryCreate('basketball', callback);
      },
      (callback) => {
        categoryCreate('casual', callback);
      },
      (callback) => {
        brandCreate('nike', '1964-01-25', callback);
      },
      (callback) => {
        brandCreate('air jordan', '1984-11-17', callback);
      },
      (callback) => {
        brandCreate('adidas', '1949-08-18', callback);
      },
    ],
    cb
  );
};

const createShoes = (cb) => {
  async.parallel(
    [
      (callback) => {
        shoeCreate('retro 1 chicago', 160, brands[1], categories[1], callback);
      },
      (callback) => {
        shoeCreate('retro 5 fire red', 170, brands[1], categories[1], callback);
      },
      (callback) => {
        shoeCreate(
          'retro 3 black cement',
          200,
          brands[1],
          categories[1],
          callback
        );
      },
      (callback) => {
        shoeCreate(
          'air force 1 triple white',
          90,
          brands[0],
          categories[2],
          callback
        );
      },
      (callback) => {
        shoeCreate(
          'air max 1 anniversary red',
          140,
          brands[0],
          categories[2],
          callback
        );
      },
      (callback) => {
        shoeCreate(
          'air max 9 infrared',
          140,
          brands[0],
          categories[2],
          callback
        );
      },
      (callback) => {
        shoeCreate(
          'ultraboost 1.0 core white',
          180,
          brands[2],
          categories[0],
          callback
        );
      },
      (callback) => {
        shoeCreate(
          'superstar cloud white',
          180,
          brands[2],
          categories[2],
          callback
        );
      },
    ],
    cb
  );
};

const createShoeInstances = (cb) => {
  const sizes = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14, 15];
  const stock = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  async.parallel(
    [
      (callback) => {
        shoeInstanceCreate(
          shoes[0],
          sizes[Math.floor(Math.random() * sizes.length)],
          stock[Math.floor(Math.random() * stock.length)],
          callback
        );
      },
      (callback) => {
        shoeInstanceCreate(
          shoes[0],
          sizes[Math.floor(Math.random() * sizes.length)],
          stock[Math.floor(Math.random() * stock.length)],
          callback
        );
      },
      (callback) => {
        shoeInstanceCreate(
          shoes[1],
          sizes[Math.floor(Math.random() * sizes.length)],
          stock[Math.floor(Math.random() * stock.length)],
          callback
        );
      },
      (callback) => {
        shoeInstanceCreate(
          shoes[2],
          sizes[Math.floor(Math.random() * sizes.length)],
          stock[Math.floor(Math.random() * stock.length)],
          callback
        );
      },
      (callback) => {
        shoeInstanceCreate(
          shoes[4],
          sizes[Math.floor(Math.random() * sizes.length)],
          stock[Math.floor(Math.random() * stock.length)],
          callback
        );
      },
      (callback) => {
        shoeInstanceCreate(
          shoes[4],
          sizes[Math.floor(Math.random() * sizes.length)],
          stock[Math.floor(Math.random() * stock.length)],
          callback
        );
      },
      (callback) => {
        shoeInstanceCreate(
          shoes[5],
          sizes[Math.floor(Math.random() * sizes.length)],
          stock[Math.floor(Math.random() * stock.length)],
          callback
        );
      },
      (callback) => {
        shoeInstanceCreate(
          shoes[6],
          sizes[Math.floor(Math.random() * sizes.length)],
          stock[Math.floor(Math.random() * stock.length)],
          callback
        );
      },
      (callback) => {
        shoeInstanceCreate(
          shoes[7],
          sizes[Math.floor(Math.random() * sizes.length)],
          stock[Math.floor(Math.random() * stock.length)],
          callback
        );
      },
      (callback) => {
        shoeInstanceCreate(
          shoes[7],
          sizes[Math.floor(Math.random() * sizes.length)],
          stock[Math.floor(Math.random() * stock.length)],
          callback
        );
      },
      (callback) => {
        shoeInstanceCreate(
          shoes[5],
          sizes[Math.floor(Math.random() * sizes.length)],
          stock[Math.floor(Math.random() * stock.length)],
          callback
        );
      },
      (callback) => {
        shoeInstanceCreate(
          shoes[3],
          sizes[Math.floor(Math.random() * sizes.length)],
          stock[Math.floor(Math.random() * stock.length)],
          callback
        );
      },
      (callback) => {
        shoeInstanceCreate(
          shoes[0],
          sizes[Math.floor(Math.random() * sizes.length)],
          stock[Math.floor(Math.random() * stock.length)],
          callback
        );
      },
    ],
    cb
  );
};

async.series(
  [creatBrandsandCategories, createShoes, createShoeInstances],
  (err, results) => {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('ShoeInstances: ' + shoeInstances);
    }

    mongoose.connection.close();
  }
);
