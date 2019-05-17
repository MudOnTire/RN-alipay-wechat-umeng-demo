const passport = require('passport');
const Account = require('./account.model');

function register(req, res, next) {
  const { username, password } = req.body;

  Account.register(new Account({ username, role: 'user' }), password)
    .then(() => {
      passport.authenticate('local')(req, res, () => {
        req.session.save((err) => {
          if (err) {
            return next(err);
          }
          req.result = {
            _id: req.user.id,
            username: req.user.username
          };
          next();
        });
      });
    })
    .catch(err => {
      err.isPublic = true;
      next(err);
    });
}

function login(req, res, next) {
  req.session.save((err) => {
    if (err) {
      return next(err);
    }
    req.result = req.user;
    next();
  });
}

function loginWithUser(user, req, res, next) {
  req.login(user, (err) => {
    if (err) {
      next(err);
    } else {
      req.result = user;
      next();
    }
  });
}

function loginOrRegisterWithThirdPartyAuth(req, res, next) {
  const { platform, username, avatar, openId } = req.body;
  let conditon;
  if (platform === 'wechat') {
    wechatOpenId = openId;
    conditon = { wechatOpenId };
  } else if (platform === 'qq') {
    qqOpenId = openId;
    conditon = { qqOpenId };
  }
  if (conditon) {
    Account.findOne(conditon)
      .then(user => {
        if (user) {
          loginWithUser(user, req, res, next);
        } else {
          Account.create({
            username,
            avatar,
            wechatOpenId: platform === 'wechat' && openId,
            qqOpenId: platform === 'qq' && openId
          }).then(user => {
            loginWithUser(user, req, res, next);
          }).catch(next);
        }
      })
      .catch(next)
  } else {
    const err = new Error(`不支持以${platform}方式登录！`);
    next(err);
  }
}

function logout(req, res, next) {
  req.logout();
  req.session.save((err) => {
    if (err) {
      return next(err);
    }
    next();
  });
}

function getCurrentUser(req, res, next) {
  req.result = req.user;
  next();
}

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  loginOrRegisterWithThirdPartyAuth
};
