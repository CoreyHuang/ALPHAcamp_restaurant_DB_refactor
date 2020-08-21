const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userSchema = require('../models/user.js')
const bcrypt = require('bcryptjs')
const FacebookStrategy = require('passport-facebook').Strategy

module.exports = app => {

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    userSchema.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('loginError', '帳號/密碼錯誤，請重新輸入~'))
        }
        return bcrypt.compare(password, user.password)
          .then(judge => {
            if (judge) {
              return done(null, user)
            }
            return done(null, false, req.flash('loginError', '帳號/密碼錯誤，請重新輸入~'))
          })
      })
      .catch(err => done(err, false))
  }))


  passport.use(new FacebookStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
      userSchema.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => userSchema.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err, false))
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


