function authChecker(req, res, next) {
  next();
  // if (!req.user) {
  //   res.sendStatus(401);
  // } else {
  //   next();
  // }
};

module.exports = authChecker;