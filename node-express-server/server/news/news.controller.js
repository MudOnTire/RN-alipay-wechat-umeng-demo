const BaseController = require('../base/base.contoller');
const News = require('./news.model');

class NewsController extends BaseController {
  constructor(...props) {
    super(...props);
  }
}

module.exports = new NewsController(News, 'title');
