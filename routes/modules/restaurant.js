const express = require('express')
const router = express.Router()

const restaurantSeed = require('../../models/restaurant.js')

router.get('/new', (req, res) => {
  restaurant = req.flash('finalData')[0]
  res.render('new', { alert: req.flash('newDateStatus'), restaurant })
})

router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  restaurantSeed.findOne({ userId, _id }).lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  restaurantSeed.findOne({ userId, _id }).lean()
    .then(restaurant => res.render('edit', { restaurant, alert: req.flash('newDateStatus') }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  req.body.userId = req.user._id
  restaurantSeed.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => {
      req.flash('newDateStatus', "請確認是否仍有參數未填寫~")
      req.flash('finalData', req.body)
      return res.redirect('/restaurants/new')
    })
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  restaurantSeed.findOne({ userId, _id })
    .then(restaurant => {
      for (let i in restaurant) {
        if (req.body[i] && typeof req.body[i] !== "function")
          restaurant[i] = req.body[i]
      }
      restaurant.save()
    })
    .then(() => {
      if (!req.body.name || !req.body.category || !req.body.description)
        req.flash('newDateStatus', "請確認是否仍有參數未填寫~")
      return res.redirect(`/restaurants/${req.params.id}/edit`)
    })
    .catch(error => res.redirect(`/restaurants/${req.params.id}/edit`))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return restaurantSeed.findOne({ userId, _id })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router