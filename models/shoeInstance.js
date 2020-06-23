const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShoeInstanceSchema = new Schema({
  // reference to the associated shoe
  shoe: {
    type: Schema.Types.ObjectId,
    ref: 'Shoe',
    required: true,
  },
  size: {
    type: String,
    required: true,
    minlength: 1,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

ShoeInstanceSchema.virtual('url').get(function () {
  return `/shoeinstances/${this._id}`;
});

module.exports = mongoose.model('ShoeIntance', ShoeInstanceSchema);
