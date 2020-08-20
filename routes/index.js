const express = require('express')
const router = express.Router()

const home = require('./modules/home.js')
const restaurant = require('./modules/restaurant.js')
const search = require('./modules/search.js')
const sort = require('./modules/sort.js')
const users = require('./modules/users.js')
const auth = require('../middleware/auth.js')

router.use('/restaurants', auth, restaurant)
router.use('/search', auth, search)
router.use('/sort', auth, sort)
router.use('/users', users)
router.use('/', auth, home)

module.exports = router