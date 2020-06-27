const moment = require('moment');
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
  return `/brands/${this._id}`;
});

BrandSchema.virtual('founded_f').get(function () {
  return moment(this.founded).format('YYYY');
});

BrandSchema.virtual('updated_f').get(function () {
  return moment(this.updated).format('MMM DD YYYY');
});

module.exports = mongoose.model('Brand', BrandSchema);
