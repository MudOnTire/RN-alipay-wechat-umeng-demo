const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const accountCtrl = require('./account.controller');
const passport = require('passport');
const authChecker = require('../../util/authChecker');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/register')
  .post(validate(paramValidation.register), accountCtrl.register);

router.route('/login')
  .post(
    validate(paramValidation.login),
    passport.authenticate('local', { failureFlash: true }),
    accountCtrl.login
  );

router.route('/thirdPartyAuth')
  .post(accountCtrl.loginOrRegisterWithThirdPartyAuth);

router.route('/logout').post(accountCtrl.logout);

router.route('/current').get(authChecker, accountCtrl.getCurrentUser);

module.exports = router;
