const { alipaySdk, alipayMobile } = require('../config/alipay/alipay');

function appPay(order) {
  const bizContent = {};
  bizContent.out_trade_no = order._id; // 商户订单编号
  // bizContent.total_amount = order.totalAmount; // 订单金额
  bizContent.total_amount = 0.01; // 订单金额
  bizContent.product_code = 'QUICK_MSECURITY_PAY'; // 销售产品码
  bizContent.goods_type = 0;
  const { goods } = order;
  bizContent.subject = `：${goods.title}`;
  return alipayMobile.createOrder(bizContent);
}

function checkAlipayNotifySign(postData) {
  return alipaySdk.checkNotifySign(postData);
}

module.exports = {
  appPay,
  checkAlipayNotifySign
}