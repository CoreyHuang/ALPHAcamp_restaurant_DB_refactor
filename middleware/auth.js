const { compare } = require("bcryptjs")

module.exports = (req, res, next) => {
  if (req.isAuthenticated())
    return next()
  req.flash('loginError', '請登入~')
  return res.redirect('/users/login')
}