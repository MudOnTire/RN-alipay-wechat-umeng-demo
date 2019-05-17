const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseModel = require('../base/base.model');

const Order = new Schema({
  ...BaseModel,
  goods: { type: Schema.Types.ObjectId, ref: 'goods' },
  goodsCount: {
    type: Number,
    required: [true, '商品数量不能为空'],
    default: 1
  },
  totalAmount: {
    type: Number,
    required: [true, '订单金额不能为空'],
    default: 0
  },
  status: {
    type: String,
    enum: ['unpaid', 'paid'],
    required: [true, '订单状态不能为空'],
    default: 'unpaid'
  },
  payWay: {
    type: String,
    enum: ['alipay', 'wepaid'],
  },
  remark: String,
  //alipay
  aliPayAmount: Number,
  aliSellerId: String,
  aliBuyerId: String,
  aliPayTime: Date,
  aliTradeNo: String,
  //wepay
  wepayAmount: Number,
  wepayTime: String,
  wepayTradeNo: String
});

module.exports = mongoose.model('order', Order);