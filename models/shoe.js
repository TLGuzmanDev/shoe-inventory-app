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
  Brand: {
    type: mongoose.Types.ObjectId,
    ref: 'Brand',
    required: true,
  },
  Category: {
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
  return `/shoes/shoe/${this._id}`;
});

module.exports = mongoose.model('Shoe', ShoeSchema);
