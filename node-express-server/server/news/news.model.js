const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseModel = require('../base/base.model');

const News = new Schema({
  ...BaseModel,
  title: String,
  detail: String,
  listImg: String
});

module.exports = mongoose.model('news', News);