const moment = require('moment');
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
  return `/categories/${this._id}`;
});

CategorySchema.virtual('updated_f').get(function () {
  return moment(this.updated).format('MMM DD YYYY');
});

module.exports = mongoose.model('Category', CategorySchema);
