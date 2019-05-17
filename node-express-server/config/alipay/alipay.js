const fs = require('fs');
const path = require('path');
const AlipaySDK = require('alipay-sdk').default;
const AlipayMobile = require('alipay-mobile');

const appId = '2019021463225522'; // real appId
// const appId = '2016092100561729'; // sandbox appId

const privateKey = fs.readFileSync(path.resolve(__dirname, './private-key.pem'), 'ascii');

// real app
const alipayPublicKey = fs.readFileSync(path.resolve(__dirname, './alipay-public-key.pem'), 'ascii'); 

// sandbox
// const alipayPublicKey = fs.readFileSync(path.resolve(__dirname, './sandbox-alipay-public-key.pem'), 'ascii');

const alipaySdk = new AlipaySDK({
  appId,
  privateKey,
  alipayPublicKey,
  signType: 'RSA2',
  gateway: 'https://openapi.alipaydev.com/gateway.do',
});

const alipayMobile = new AlipayMobile({
  app_id: appId,
  appPrivKeyFile: privateKey,
  alipayPubKeyFile: alipayPublicKey,
  notify_url: 'http://specialspeaker.applinzi.com/api/orders/alipay/notify',
});

module.exports = { alipaySdk, alipayMobile };