const fs = require('fs');
const path = require('path');
const tenpay = require('tenpay');

const config = {
  // eich
  appid: 'wx6330d9d45fe49b04', //公众号appid
  // appid: 'wx63f0e9b11b8cc14d', //公众号appid
  mchid: '1488057972', // 商户号
  partnerKey: 'AnxptVfHeNFsEHCdxpa7wik3Zb6uVd53',
  pfx: fs.readFileSync(path.resolve(__dirname,'./cert/apiclient_cert.p12')),
  notify_url: 'http://specialspeaker.applinzi.com/api/orders/wepay/notify',
};

// 方式一
const api = new tenpay(config);

// // 方式二
// const api = tenpay.init(config);

// // 调试模式(传入第二个参数为true, 可在控制台输出数据)
// const api = new tenpay(config, true);

// // 沙盒模式(用于微信支付验收)
// const sandboxAPI = await tenpay.sandbox(config);

module.exports = api;