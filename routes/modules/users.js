const express = require('express')
const router = express.Router()
const userSchema = require('../../models/user.js')
const bcryptjs = require('bcryptjs')
const passport = require('passport')

router.get('/login', (req, res) => {
  email = req.flash('email')
  res.render('login', { loginError: req.flash('loginError')[0], email })
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
    req.flash('registerError', '所有都是必填!\n')
    return res.render('register', { registerError: req.flash('registerError'), name, email})
  }
  if (password !== confirmPassword) {
    req.flash('registerError', '密碼與確認密碼不同!\n')
    return res.render('register', { registerError: req.flash('registerError'), name, email })
  }

  userSchema.findOne({ email })
    .then(user => {
      if (user) {
        req.flash('registerError', '帳號已註冊過!\n')
        return res.render('register', {
          name,
          email,
          registerError: req.flash('registerError'),
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