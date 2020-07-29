const express = require('express')
const router = express.Router()

const restaurantSeed = require('../../models/restaurant.js')

router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const sort = {}
  if (keyword === "A -> Z") sort.name = 1
  else if (keyword === "Z -> A") sort.name = -1
  else if (keyword === "類別") sort.category = 1
  else sort.location = 1

  restaurantSeed.find()
    .lean()
    .sort(sort)
    .then(restaurants => res.render('index', { restaurants, sortKeyword: keyword }))
    .catch(error => console.log(error))
})

module.exports = router

