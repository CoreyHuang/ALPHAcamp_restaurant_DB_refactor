const express = require('express')
const router = express.Router()

const restaurantSeed = require('../../models/restaurant.js')


router.get('/', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  restaurantSeed.find().lean()
    .then(restaurants => {
      const searchData = restaurants.filter(restaurant => {
        return restaurant.name.includes(keyword) || restaurant.category.includes(keyword) ||
          restaurant.name_en.toLowerCase().includes(keyword)
      })
      res.render('index', { restaurants: searchData, keyword: req.query.keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router