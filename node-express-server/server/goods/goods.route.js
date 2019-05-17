const goodsCtrl = require('./goods.controller');
const goodsRouter = require('../base/base.route')(goodsCtrl);

module.exports = goodsRouter;
