const restaurantSchema = require('../restaurant.js')
const seedData = require('../../restaurant.json').results
const userSchema = require('../user.js')
const bcryptjs = require('bcryptjs')

const db = require('../../config/moogoose.js')

const users = [{ name: 'user1', email: 'user1@example.com', password: '12345678' },
{ name: 'user2', email: 'user2@example.com', password: '12345678' }]


db.once('open', () => {
  userSchema.findOne({ email: users[0].email })
    .then((user) => {
      if (user) return process.exit()
      return Promise.all([createUser(users[0]), createUser(users[1])])
        .then((users) => users)
        .catch((error) => console.log(error))
    })
    .then(users => {
      return Promise.all(Array.from({ length: 6 }, (_, i) => {
        if (i > 2) return createUserData(users[1], seedData[i])
        return createUserData(users[0], seedData[i])
      }))
        .then(() => console.log('create all users data'))
        .catch((error) => console.log(error))
    })
    .then(() => process.exit())
    .catch((error) => console.log(error))
})

// function ///////////////////////////////////////////////////////////
function createUser(user) {
  return new Promise(function (resolve, reject) {
    bcryptjs
      .genSalt(10)
      .then(salt => {
        return bcryptjs.hash(user.password, salt)
      })
      .then((hash) => {
        const { name, email } = user
        return userSchema.create({ name, email, password: hash })
      })
      .then((user) => resolve(user))
      .catch((err) => reject('user create fail'))
  });
}

function createUserData(user, jsonData) {
  return new Promise(function (resolve, reject) {
    jsonData.userId = user._id
    return restaurantSchema.create(jsonData)
      .then(() => resolve())
      .catch(err => reject(err))
  })
}