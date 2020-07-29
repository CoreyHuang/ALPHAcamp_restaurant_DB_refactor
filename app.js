//Server default setting
const express = require('express')
const restaurantSeed = require('./models/restaurant.js')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const db = require('./config/moogoose.js')
const router = require('./routes/index.js')
const exphbs = require('express-handlebars')

const app = express()
app.engine('handlebars', exphbs({ defaultLayout: "main" }))
app.set('view engine', 'handlebars')

const host = 3000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(router)

//Listen server
app.listen(host, () => { console.log("Enable server...") })
