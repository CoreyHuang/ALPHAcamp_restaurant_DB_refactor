const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userSchema = require('../models/user.js')
const bcrypt = require('bcryptjs')




module.exports = app => {

  console.log('in passport')

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    console.log('in passport - 2')
    userSchema.findOne({ email })
      .then(user => {
        if (!user) {
          console.log('輸出提示 此帳號不存在  要return')
          return done(null, false)
        }
        return bcrypt.compare(password, user.password)
          .then(judge => {
            if (judge) {
              console.log('輸出提示 密碼正確')
              return done(null, user)
            }
            console.log('輸出提示 密碼錯誤')
            return done(null, false)
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


