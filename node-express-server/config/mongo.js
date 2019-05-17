const mongoose = require('mongoose');
const util = require('util');
const debug = require('debug')('express-mongoose-es6-rest-api:index');
const config = require('./config');

// mongo url
const mongoUri = config.mongo.host;

// mongo options
const mongoOptions = {
  useFindAndModify: false,
  useNewUrlParser: true,
  user: config.mongo.user,
  pass: config.mongo.pass
};
if (mongoOptions.user && mongoOptions.pass) {
  mongoOptions.auth = {
    authSource: "admin"
  };
}

// setup mongo
function setupMongo() {
  // promise in mongoose
  mongoose.Promise = global.Promise;
  if (config.env === 'production') {
    console.log('will connect to: ', config.mongo.str);
    mongoose.connect(config.mongo.str, { useNewUrlParser: true, useFindAndModify: false });
  } else {
    mongoose.connect(mongoUri, mongoOptions);
  }
  mongoose.connection.on('error', (err) => {
    console.log(err);
    throw new Error(`unable to connect to database: ${mongoUri}`);
  });
  mongoose.set('useCreateIndex', true);
  mongoose.Promise = global.Promise;

  // print mongoose logs in dev env
  if (config.mongooseDebug) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
      debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
  }
  return mongoose;
}

module.exports = {
  mongoUri,
  mongoOptions,
  setupMongo
}