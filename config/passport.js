const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userSchema = require('../models/user.js')
const bcrypt = require('bcryptjs')

module.exports = app => {

  app.use(passport.initialize());
  app.use(passport.session());
  // console.log('xx', req.body)
  // app.use((req, res, next) => {
  //   console.log('bodyqq', req.body)
  //   next()
  // })

  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    // if (!email )
    //   return done(null, false, req.flash('loginError', '帳號/密碼不能為空~'))
    // console.log('xx', email, password)
    // console.log('xx2', req.body)
    // if (!req.body.email || !req.body.password)
    //   return done(null, false, req.flash('loginError', '帳號/密碼不能為空~'))

    userSchema.findOne({ email })
      .then(user => {
        if (!user) {
          console.log('輸出提示 此帳號不存在  要return')
          return done(null, false, req.flash('loginError', '帳號/密碼錯誤，請重新輸入~'))
        }
        return bcrypt.compare(password, user.password)
          .then(judge => {
            if (judge) {
              console.log('輸出提示 密碼正確')
              return done(null, user)
            }
            console.log('輸出提示 密碼錯誤', done)
            return done(null, false, req.flash('loginError', '帳號/密碼錯誤，請重新輸入~'))
          })
      })
      .catch(err => done(err, false))
  }))


  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    userSchema.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  });
}


// function test(req, res, next) {
//   // if (!email || !password)
//   console.log('body', req.body)
//   next()
// }