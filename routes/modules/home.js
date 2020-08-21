const express = require('express')
const router = express.Router()
const restaurantSeed = require('../../models/restaurant.js')

const session = require('express-session')

router.get('/', (req, res) => {
  const userId = req.user._id 
  restaurantSeed.find({ userId }).lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

module.exports = router