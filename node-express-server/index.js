const AV = require('leancloud-storage');

// config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/express');

// leancloud
AV.init({
  appId: "3Cv4LgrotM7g7EPp0eyGUVkY-gzGzoHsz",
  appKey: "IngJNFlgMgApPFw8U3V7L42q"
});

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });
}

module.exports = app;
