const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

CategorySchema.virtual('url').get(function () {
  return `/shoes/category/${this._id}`;
});

module.exports = mongoose.model('Category', CategorySchema);
