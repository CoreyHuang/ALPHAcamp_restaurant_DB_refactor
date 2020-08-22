module.exports = (req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.userData = req.user
  res.locals.loginError = req.flash('loginError')
  next()
}