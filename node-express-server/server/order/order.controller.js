const BaseController = require('../base/base.contoller');
const Order = require('./order.model');
const Goods = require('../goods/goods.model');
const alipayService = require('../../services/alipay');
const wepayService = require('../../services/wepay');

class OrderController extends BaseController {
  constructor(...props) {
    super(...props);
  }

  create(req, res, next) {
    const order = req.body;
    const goodsId = order.goods;
    if (goodsId) {
      Goods.findById(goodsId)
        .then(goods => {
          super.create(req, res, next, { totalAmount: goods.price });
        })
        .catch(err => {
          next(err);
        })
    } else {
      const error = new Error();
      error.message = '未找到相应课程';
      next(error);
    }
  }

  query(req, res, next) {
    super.query(req, res, next, {}, ['goods']);
  }

  findById(req, res, next) {
    super.findById(req, res, next, ['goods']);
  }

  /**
   * 支付宝app支付
   */
  alipayApp(req, res, next) {
    const order = req.body;
    alipayService.appPay(order)
      .then(result => {
        req.result = result;
        next();
      })
      .catch(err => {
        next(err);
      });
  }

  /**
   * 支付宝支付结果通知  
   */
  alipayNotify(req, res, next) {
    console.log('支付宝异步通知');
    const tradeInfo = req.body;
    const result = alipayService.checkAlipayNotifySign(tradeInfo);
    const {
      out_trade_no, // 外部订单id
      trade_no,  // 支付宝交易号
      buyer_pay_amount, // 支付金额
      trade_status, // 支付状态（TRADE_SUCCESS）
      buyer_id, // 买家编号
      seller_id, // 卖家编号
      gmt_payment, // 支付时间
    } = tradeInfo;
    if (tradeInfo && result) {
      Order.findOneAndUpdate({ _id: out_trade_no }, {
        status: trade_status === 'TRADE_SUCCESS' ? 'paid' : 'unpaid',
        payWay: 'alipay',
        aliPayAmount: buyer_pay_amount,
        aliSellerId: seller_id,
        aliBuyerId: buyer_id,
        aliPayTime: gmt_payment,
        aliTradeNo: trade_no
      }).then(order => {
        res.send('success');
      }).catch(err => {
        res.end();
      });
    } else {
      res.end();
    }
  }

  alipayNotifyGet(req, res, next) {
    res.end();
  }

  /**
   * 微信app支付
   */
  wepayApp(req, res, next) {
    const order = req.body;
    wepayService.appPay(order)
      .then(result => {
        req.result = result;
        next();
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  }

  /**
   * 微信付款/退款异步通知
   */
  wepayNotify(req, res, next) {
    let info = req.weixin;
    // { appid: 'wx5aee5feb7e63f39c',
    // bank_type: 'CFT',
    // cash_fee: '1',
    // fee_type: 'CNY',
    // is_subscribe: 'Y',
    // mch_id: '1526007021',
    // nonce_str: 'la2CuLQYyHVqlsBi',
    // openid: 'ohOUh1cEvEdJxds6MrPVoeXFL6v8',
    // out_trade_no: '5c8a7e867514f071ec0ba32b',
    // result_code: 'SUCCESS',
    // return_code: 'SUCCESS',
    // sign: 'E92B812E71FB9B934E97ECBD27C60620',
    // time_end: '20190315001721',
    // total_fee: '1',
    // trade_type: 'MWEB',
    // transaction_id: '4200000239201903154708331789' }
    if (info) {
      const {
        out_trade_no,
        result_code,
        time_end,
        total_fee,
        transaction_id
      } = info;
      Order.findByIdAndUpdate(out_trade_no, {
        payWay: 'wepay',
        wepayAmount: Number(total_fee) / 100,
        status: result_code === 'SUCCESS' ? 'paid' : 'unpaid',
        wepayTime: time_end,
        wepayTradeNo: transaction_id
      }).then(order => {
        res.send('success');
      }).catch(err => {
        res.end();
      });
    } else {
      res.end();
    }
  }
}

module.exports = new OrderController(Order);
