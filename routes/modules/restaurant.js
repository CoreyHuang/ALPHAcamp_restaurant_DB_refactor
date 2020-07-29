const express = require('express')
const router = express.Router()

const restaurantSeed = require('../../models/restaurant.js')
let newDataError


router.get('/new', (req, res) => {
  res.render('new', { alert: newDataError })
  newDataError = 0
})

router.post('/', (req, res) => {
  restaurantSeed.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => { newDataError = 1; return res.redirect('/restaurants/new') })
})

router.put('/:id', (req, res) => {
  restaurantSeed.findById(req.params.id)
    .then(restaurant => {
      for (let i in restaurant) {
        if (req.body[i] && typeof req.body[i] !== "function")
          restaurant[i] = req.body[i]
      }
      restaurant.save()
    })
    .then(() => {
      if (!req.body.name || !req.body.category || !req.body.description) newDataError = 1
      else newDataError = 0
      return res.redirect(`/restaurants/${req.params.id}/edit`)
    })
    .catch(error => res.redirect(`/restaurants/${req.params.id}/edit`))
})

router.get('/:id/edit', (req, res) => {
  restaurantSeed.findById(req.params.id).lean()
    .then(restaurant => res.render('edit', { restaurant, alert: newDataError }))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  restaurantSeed.findById(req.params.id).lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})



router.delete('/:id', (req, res) => {
  restaurantSeed.findById(req.params.id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router