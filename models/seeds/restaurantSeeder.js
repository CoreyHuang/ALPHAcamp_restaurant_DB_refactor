const restaurantInfo = require('../restaurant.js')
const restaurantSeedData = require('../../restaurant.json').results

const db = require('../../config/moogoose.js')


db.once('open', () => {
  console.log('mongodb connected!!')
  restaurantSeedData.forEach(data => {
    restaurantInfo.create({
      name: `${data.name}`,
      name_en: `${data.name_en}`,
      category: `${data.category}`,
      image: `${data.image}`,
      location: `${data.location}`,
      phone: `${data.phone}`,
      google_map: `${data.google_map}`,
      rating: `${data.rating}`,
      description: `${data.description}`,
    })
  })
  console.log('done')
})