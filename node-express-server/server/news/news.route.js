const newsCtrl = require('./news.controller');
const authChecker = require('../../util/authChecker');
const newsRouter = require('../base/base.route')(newsCtrl);

newsRouter.route('/preview/:id')
  .get(newsCtrl.findById)

module.exports = newsRouter;
