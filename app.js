//Server default setting
const express = require('express')
const app = express()
const host = 3000
let newDataError = 0

//Require restaurant json file
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

//Require body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

const methodOverride = require('method-override')
app.use(methodOverride('_method'))


// 載入mongoose與相關設定
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection // 取得資料庫連線狀態
db.on('error', () => { console.log('mongodb error!') }) //連線失敗
db.once('open', () => { console.log('mongodb connected!') }) //連線成功



const router = require('./routes/index.js')
app.use(router)
//Get method request---------------------------------------------------------------------------
// app.get('/', (req, res) => {
//   console.log("req.params.edit", req.params)
//   restaurantSeed.find().lean()
//     .then(restaurants => res.render('index', { restaurants }))
//     .catch(error => console.log(error))
// })

// app.get('/restaurants/new', (req, res) => {
//   res.render('new', { alert: newDataError })
//   newDataError = 0
// })

// // app.get('/restaurants/edit', (req, res) => {
// //   res.render('edit', { alert: newDataError })
// //   newDataError = 0
// // })

// app.get('/restaurants/:id', (req, res) => {
//   restaurantSeed.findById(req.params.id).lean()
//     .then(restaurant => res.render('show', { restaurant }))
//     .catch(error => console.log(error))
// })



// app.delete('/restaurants/:id', (req, res) => {
//   restaurantSeed.findById(req.params.id)
//     .then(restaurant => restaurant.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword.toLowerCase()
//   restaurantSeed.find().lean()
//     .then(restaurants => {
//       const searchData = restaurants.filter(restaurant => {
//         return restaurant.name.includes(keyword) || restaurant.category.includes(keyword) ||
//           restaurant.name_en.toLowerCase().includes(keyword)
//       })
//       res.render('index', { restaurants: searchData, keyword: req.query.keyword })
//     })
//     .catch(error => console.log(error))
// })

//POST method request---------------------------------------------------------------------------
// app.post('/restaurants', (req, res) => {
//   restaurantSeed.create(req.body)
//     .then(() => res.redirect('/'))
//     .catch(error => { newDataError = 1; return res.redirect('/restaurants/new') })
// })

// app.put('/restaurants/:id', (req, res) => {
//   restaurantSeed.findById(req.params.id)
//     .then(restaurant => { 
//       for (let i in restaurant) {
//         if (req.body[i] && typeof req.body[i] !== "function")
//           restaurant[i] = req.body[i]
//       }
//       restaurant.save()
//     })
//     .then(() => { 
//       if (!req.body.name || !req.body.category || !req.body.description) newDataError = 1
//       else newDataError = 0
//       return res.redirect(`/restaurants/${req.params.id}/edit`) })
//     .catch(error => res.redirect(`/restaurants/${req.params.id}/edit`) )
// })

// app.get('/restaurants/:id/edit', (req, res) => {
//   restaurantSeed.findById(req.params.id).lean()
//     .then(restaurant => res.render('edit', { restaurant, alert: newDataError }))
//     .catch(error => console.log(error))
// })

