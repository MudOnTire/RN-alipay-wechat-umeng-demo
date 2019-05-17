const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseModel = require('../base/base.model');

const Goods = new Schema({
  ...BaseModel,
  title: String,
  detail: String,
  price: Number,
  listImg: String,
});

module.exports = mongoose.model('goods', Goods);