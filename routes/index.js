const express = require('express')
const router = express.Router()

const home = require('./modules/home.js')
const restaurant = require('./modules/restaurant.js')
const users = require('./modules/users.js')
const auth = require('../middleware/auth.js')
const authFacebook = require('./modules/authFacebook.js')

router.use('/restaurants', auth, restaurant)
router.use('/users', users)
router.use('/auth', authFacebook)
router.use('/', auth, home)

module.exports = router