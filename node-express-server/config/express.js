const path = require('path');
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const httpStatus = require('http-status');
const expressWinston = require('express-winston');
const expressValidation = require('express-validation');
const helmet = require('helmet');
const multer = require('multer');
const winstonInstance = require('./winston');
const routes = require('../index.route');
const config = require('./config');
const mongoConfig = require('./mongo');
const APIError = require('../server/helpers/APIError');
const Account = require('../server/account/account.model');

const mongoose = mongoConfig.setupMongo();

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: '*/xml' }));
app.use(cookieParser());
app.use(compress());
app.use(methodOverride());
app.use(session({
  secret: 'mudontire-secret',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 30 * 24 * 3600 * 1000
  },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// passport
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
// passport config
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

const maxFileSize = 5; // 5MB

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: maxFileSize * 1024 * 1024 // 5MB
  }
});
app.use(upload.any());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
const whitelist = [
  'http://localhost:8003',
  'http://localhost:8002',
  'http://localhost:8000',
  'http://localhost:8001'
];
const corsOptions = {
  origin: function (origin, callback) {
    // if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
    if (origin === undefined
      || origin.indexOf('localhost') >= 0
      || origin.indexOf('192.168') >= 0
      || origin.indexOf('47.105.110.234')
      || origin.indexOf('47.105.159.25')) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}
app.use(cors(corsOptions));

// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}

// mount all routes on /api path
app.use('/api', routes);

// 后台管理系统
const adminDist = path.resolve(__dirname, '../admin');
// app.get('/admin/*', (req, res) => {
//   res.setHeader('Cache-Control', 'no-store');
//   res.sendFile(path.resolve(__dirname, '../admin', 'index.html'));
// });
app.use(express.static(adminDist));

// 统一处理
app.use((req, res, next) => {
  res.send({
    code: 0,
    result: req.result
  });
});

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance
  }));
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars

  let { message } = err;
  if (message === 'File too large') {
    err.isPublic = true;
    message = `文件大小不能超过${maxFileSize}MB`;
  }

  res.status(err.status).json({
    code: -1,
    message: err.isPublic ? message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {}
  });

});

module.exports = app;
