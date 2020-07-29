const express = require('express')
const router = express.Router()
const restaurantSeed = require('../../models/restaurant.js')

router.get('/', (req, res) => {
  restaurantSeed.find().lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

module.exports = router