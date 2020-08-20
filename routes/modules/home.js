const express = require('express')
const router = express.Router()
const restaurantSeed = require('../../models/restaurant.js')

const session = require('express-session')

router.get('/', (req, res) => {
  console.log('req.user', req.user)
  console.log('req.session', req.session)
  
  restaurantSeed.find().lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

module.exports = router