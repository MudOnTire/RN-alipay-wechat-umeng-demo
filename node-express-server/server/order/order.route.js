const orderCtrl = require('./order.controller');
const authChecker = require('../../util/authChecker');
const orderRouter = require('../base/base.route')(orderCtrl);
const wepayApi = require('../../config/wepay/wepay');

// orderRouter.route('/user/current')
//   .get(authChecker, (req, res, next) => {
//     const query = {
//       ...req.query,
//       buyerId: req.user._id.toString()
//     };
//     req.query = query;
//     orderCtrl.query(req, res, next);
//   });

orderRouter.route('/pay/app/alipay')
  .post(authChecker, orderCtrl.alipayApp);

orderRouter.route('/pay/app/wepay')
  .post(authChecker, orderCtrl.wepayApp);

orderRouter.route('/alipay/notify')
  .post(orderCtrl.alipayNotify);

orderRouter.route('/alipay/notify')
  .get(orderCtrl.alipayNotifyGet);

orderRouter.route('/wepay/notify')
  .post(wepayApi.middlewareForExpress('pay'), orderCtrl.wepayNotify);

module.exports = orderRouter;
