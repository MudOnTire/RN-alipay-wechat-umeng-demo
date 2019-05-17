const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number()
    .default(4040),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number()
    .default(27017)
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

let mongo_host = envVars.MONGO_HOST;
let mongo_user, mongo_pass, mongo_str;
if (envVars.NODE_ENV === 'production') {
  // mongo_host = envVars.MONGO_HOST_PRO;
  // mongo_user = envVars.MONGO_USER;
  // mongo_pass = envVars.MONGO_PASS;
  mongo_str = envVars.MONGO_PRO_STR;
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    host: mongo_host,
    port: envVars.MONGO_PORT,
    user: mongo_user,
    pass: mongo_pass,
    str: mongo_str
  }
};

module.exports = config;
