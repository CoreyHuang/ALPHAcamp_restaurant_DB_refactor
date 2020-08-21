const express = require('express')
const router = express.Router()

const restaurantSeed = require('../../models/restaurant.js')


router.get('/', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const userId = req.user._id 
  restaurantSeed.find({ userId,
    $or: [{ name: keyword }, { category: keyword },
    { name_en: { $regex: new RegExp("^" + keyword, "i") } }]
  })
    .lean()
    .then(restaurants => {
      res.render('index', { restaurants, keyword: req.query.keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router


