const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  name_en: { type: String },
  category: { type: String },
  image: { type: String },
  location: { type: String },
  phone: { type: String },
  googleMap: { type: String },
  rating: { type: String },
  description: { type: String },
})
module.exports = mongoose.model('restaurantInfo', restaurantSchema)