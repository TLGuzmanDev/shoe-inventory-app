const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShoeSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  brand: {
    type: mongoose.Types.ObjectId,
    ref: 'Brand',
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

ShoeSchema.virtual('url').get(function () {
  return `/shoes/${this._id}`;
});

ShoeSchema.virtual('updated_f').get(function () {
  return moment(this.updated).format('MMM DD YYYY');
});

module.exports = mongoose.model('Shoe', ShoeSchema);
