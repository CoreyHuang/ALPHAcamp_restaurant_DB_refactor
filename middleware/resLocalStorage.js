module.exports = (req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.userData = req.user
 
  // console.log(' res.locals',res.locals)
  next()
}