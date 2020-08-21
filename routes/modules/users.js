const express = require('express')
const router = express.Router()
const userSchema = require('../../models/user.js')
const bcryptjs = require('bcryptjs')
const passport = require('passport')

router.get('/login', (req, res) => {
  // console.log('req.user', req.user)
  // console.log('req.session', req.session)
  // console.log('res.locals', res.locals)
  email = req.flash('email')
  password = req.flash('password')
  // console.log('req.flash', req.flash('password'))
  res.render('login', { loginError: req.flash('loginError')[0], email, password })
})

router.post('/login', judgeInput, passport.authenticate('local', { failureRedirect: '/users/login' }),
  (req, res) => {
    res.redirect('/');
  })
function judgeInput(req, res, next) {
  // console.log("req.body -test", req.body)
  if (!req.body.email || !req.body.password)
    req.flash('loginError', '帳號/密碼不能為空~')
  req.flash('email', req.body.email)
  req.flash('password', req.body.password)
  next()
}

router.get('/logout', (req, res) => {
  // console.log('req.user', req.user)
  // console.log('req.session', req.session)
  req.logout()
  // console.log('req.session', req.session)
  res.redirect('/user/login')
})


router.get('/register', (req, res) => {
  // console.log('req.body', req.body)
  // console.log(' req.flash', req.flash('Error'))
  res.render('register')
})

router.post('/register', (req, res) => {

  // console.log('req.body', req.body)
  const { name, email, password, confirmPassword } = req.body
  // console.log('password', password)

  if (!name || !email || !password || !confirmPassword) {
    console.log('輸出提示 所有都是必填')
    req.flash('registerError', '所有都是必填!\n')
  }
  if (password !== confirmPassword) {
    console.log('輸出提示 密碼與確認密碼不同')
    req.flash('registerError', '密碼與確認密碼不同!\n')
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