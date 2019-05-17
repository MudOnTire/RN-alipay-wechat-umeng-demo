const alipaySdk = require('./config/alipay/alipay');

alipaySdk.exec('alipay.system.oauth.token', {
  grantType: 'authorization_code',
  // code: 'code',
  // refreshToken: 'token'
}, {
    // 验签
    validateSign: true,
    // 打印执行日志
    log: this.logger,
  }).then(result => {
    console.log(result);
  }).catch(err => {
    console.error(err);
  });