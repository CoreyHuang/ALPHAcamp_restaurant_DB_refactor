module.exports = (req, res, next) => {
  if (req.isAuthenticated())
    return next()
  console.log('輸出提醒 請使用者登入')
  return res.redirect('/users/login')
}