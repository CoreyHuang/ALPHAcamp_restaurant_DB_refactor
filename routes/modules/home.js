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


router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const userId = req.user._id
  restaurantSeed.find({
    userId,
    $or: [{ name: { $regex: keyword, $options: 'i' } }, { category: { $regex: keyword, $options: 'i' } },
    { name_en: { $regex: keyword, $options: 'i' } }]
  })
    .lean()
    .then(restaurants => {
      res.render('index', { restaurants, keyword: req.query.keyword })
    })
    .catch(error => console.log(error))
})

router.get('/sort', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword
  const sort = {}
  if (keyword === "A -> Z") sort.name = 1
  else if (keyword === "Z -> A") sort.name = -1
  else if (keyword === "類別") sort.category = 1
  else sort.location = 1

  restaurantSeed.find({ userId })
    .lean()
    .sort(sort)
    .then(restaurants => res.render('index', { restaurants, sortKeyword: keyword }))
    .catch(error => console.log(error))
})

module.exports = router