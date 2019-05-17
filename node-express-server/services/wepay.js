const wepayApi = require('../config/wepay/wepay');

async function appPay(order) {
  const bizContent = {};
  bizContent.out_trade_no = order._id; // 商户订单编号
  // bizContent.total_fee = order.totalAmount; // 订单金额
  bizContent.total_fee = 1; // 订单金额
  const { goods } = order;
  bizContent.body = `商品：${goods.title}`;
  let result = await wepayApi.getAppParams(bizContent);
  return result;
}

module.exports = { appPay }