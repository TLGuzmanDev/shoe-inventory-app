const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  founded: {
    type: Date,
    required: true,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

BrandSchema.virtual('url').get(function () {
  return `/shoes/brand/${this._id}`;
});

module.exports = mongoose.model('Brand', BrandSchema);
