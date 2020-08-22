const express = require('express')
const router = express.Router()
const userSchema = require('../../models/user.js')
const bcryptjs = require('bcryptjs')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login', { email: req.flash('email') })
})

router.post('/login', judgeInput, passport.authenticate('local', { failureRedirect: '/users/login' }),
  (req, res) => {
    res.redirect('/');
  })
function judgeInput(req, res, next) {
  if (!req.body.email || !req.body.password)
    req.flash('loginError', '帳號/密碼不能為空~')
  req.flash('email', req.body.email)
  next()
}

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/user/login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  if (!name || !email || !password || !confirmPassword) {
    return res.render('register', { registerError: '所有都是必填!', name, email })
  }
  if (password !== confirmPassword) {
    return res.render('register', { registerError: '密碼與確認密碼不同!', name, email })
  }

  userSchema.findOne({ email })
    .then(user => {
      if (user) {
        return res.render('register', {
          name, email,
          registerError: '帳號已註冊過!'
        })
      }

      return bcryptjs.genSalt(10)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashWord => {
          userSchema.create({
            name,
            email,
            password: hashWord,
          })
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router