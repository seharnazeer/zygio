// Model/Restaurant.js
const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  restaurantName: {
    type: String,
    required: true,

  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  addressLine1: {
    type: String,
  },
  addressLine2: {
    type: String,
  },
  location: {
    type: String,
  },
  profilePictureUrl: {
    type: String, // URL of the profile picture stored in Cloudinary
  },
  status: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
