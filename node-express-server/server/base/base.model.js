const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
  createdTime: Date,
  updatedTime: Date,
  isDeleted: Boolean
}