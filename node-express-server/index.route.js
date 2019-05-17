const express = require('express');
const accountRoutes = require('./server/account/account.route');
const goodsRoutes = require('./server/goods/goods.route');
const newsRoutes = require('./server/news/news.route');
const orderRoutes = require('./server/order/order.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/accounts', accountRoutes);

router.use('/goods', goodsRoutes);

router.use('/news', newsRoutes);

router.use('/orders', orderRoutes);

module.exports = router;