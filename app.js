//Server default setting
const express = require('express')
const app = express()
const host = 3000

//Require restaurant json file
const restaurants = require('./restaurant.json').results

//Set view engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: "main" }))
app.set('view engine', 'handlebars')

// Set public file
app.use(express.static('public'))

//Listen server
app.listen(host, () => {
  console.log("Enable server...")
})

//Get method request---------------------------------------------------------------------------
app.get('/', (req, res) => {
  res.render('index', { restaurants })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurants.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const searchData = restaurants.filter(restaurant => {
    return restaurant.name.includes(keyword) || restaurant.category.includes(keyword) ||
      restaurant.name_en.toLowerCase().includes(keyword)
  })
  res.render('index', { restaurants: searchData, keyword: req.query.keyword })
})

