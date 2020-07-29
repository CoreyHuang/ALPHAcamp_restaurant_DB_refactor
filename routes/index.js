const express = require('express')
const router = express.Router()

const home = require('./modules/home.js')
const restaurant = require('./modules/restaurant.js')
const search = require('./modules/search.js')

router.use('/', home)
router.use('/restaurants', restaurant)
router.use('/search', search)

module.exports = router