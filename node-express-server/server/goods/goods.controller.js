const BaseController = require('../base/base.contoller');
const Goods = require('./goods.model');

class GoodsController extends BaseController {
  constructor(...props) {
    super(...props);
  }
}

module.exports = new GoodsController(Goods, 'title');
