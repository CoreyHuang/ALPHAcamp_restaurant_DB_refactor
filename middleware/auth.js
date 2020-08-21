const { compare } = require("bcryptjs")

module.exports = (req, res, next) => {
  if (req.isAuthenticated())
    return next()
  // console.log('輸出提醒 請使用者登入')
  req.flash('loginError', '請登入~')
  // console.log('req.flash - auth', req.flash('loginError'))
  // res.locals.loginError = '請登入~'

  return res.redirect('/users/login')
}