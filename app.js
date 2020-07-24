//Server default setting
const express = require('express')
const app = express()
const host = 3000

//Require restaurant json file
// const restaurants = require('./restaurant.json').results
const restaurantSeed = require('./models/restaurant.js')

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

// 載入mongoose與相關設定
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection // 取得資料庫連線狀態
db.on('error', () => { console.log('mongodb error!') }) //連線失敗
db.once('open', () => { console.log('mongodb connected!') }) //連線成功


//Get method request---------------------------------------------------------------------------
app.get('/', (req, res) => {
  restaurantSeed.find().lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  restaurantSeed.findById(req.params.id).lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
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

