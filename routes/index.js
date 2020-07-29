const express = require('express')
const router = express.Router()

const home = require('./modules/home.js')
const restaurant = require('./modules/restaurant.js')
const search = require('./modules/search.js')
const sort = require('./modules/sort.js')

router.use('/', home)
router.use('/restaurants', restaurant)
router.use('/search', search)
router.use('/sort', sort)

module.exports = router