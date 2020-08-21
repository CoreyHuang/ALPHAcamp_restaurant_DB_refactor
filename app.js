if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const restaurantSeed = require('./models/restaurant.js')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const db = require('./config/moogoose.js')
const router = require('./routes/index.js')
const exphbs = require('express-handlebars')
const session = require('express-session')
const usePassport = require('./config/passport.js')
const useResLocalStorage = require('./middleware/resLocalStorage.js')
const flash = require('connect-flash');

const app = express()
app.engine('handlebars', exphbs({ defaultLayout: "main" }))
app.set('view engine', 'handlebars')

const port = process.env.port

app.use(session({
  secret: process.env.secret,
  resave: false,
  saveUninitialized: true,
}))
app.use(flash());

usePassport(app)
app.use(useResLocalStorage)

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(router)

//Listen server
app.listen(port, () => { console.log("Enable server...") })
