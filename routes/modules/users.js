const express = require('express')
const router = express.Router()
const userSchema = require('../../models/user.js')
const bcryptjs = require('bcryptjs')
const passport = require('passport')

router.get('/login', (req, res) => {
  // console.log('req.user', req.user)
  // console.log('req.session', req.session)
  res.render('login')
})

router.post('/login', passport.authenticate('local', { failureRedirect: '/users/login' }),
   (req, res) => {
    res.redirect('/');
  })

router.get('/logout', (req, res) => {
  // console.log('req.user', req.user)
  // console.log('req.session', req.session)
  req.logout()
  // console.log('req.session', req.session)
  res.redirect('/user/login')
})


router.get('/register', (req, res) => {

  res.render('register')
})

router.post('/register', (req, res) => {

  // console.log('req.body', req.body)
  const { name, email, password, confirmPassword } = req.body
  // console.log('password', password)

  if (!name || !email || !password || !confirmPassword) {
    console.log('輸出提示 所有都是必填')
  }
  if (password !== confirmPassword) {
    console.log('輸出提示 密碼與確認密碼不同')
  }

  userSchema.findOne({ email })
    .then(user => {
      if (user)
      return console.log('帳號重複 回傳所有提示資料')

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