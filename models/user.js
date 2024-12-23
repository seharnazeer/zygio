// Model/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
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
  profilePictureUrl: {
    type: String, // URL of the profile picture stored in Cloudinary
  },
  status: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

module.exports = mongoose.model('User', UserSchema);
