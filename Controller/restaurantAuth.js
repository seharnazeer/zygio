// Controller/restaurantAuth.js
const Restaurant = require('../models/restaurant');
const mongoose = require('mongoose');
const cloudinary = require('../cloudinaryConfig');
const bcrypt = require('bcrypt');


const registerRestaurant = async (req, res) => {
  try {
    const { email, restaurantName, password, phoneNumber, addressLine1, addressLine2, location, profilePictureUrl } = req.body;


    const existingRestaurant = await Restaurant.findOne({ email });
    if (existingRestaurant) {
      return res.status(400).json({ message: 'Restaurant owner already registered with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newRestaurant = new Restaurant({
      email,
      restaurantName,
      password: hashedPassword,
      phoneNumber,
      addressLine1,
      addressLine2,
      location,
      profilePictureUrl,
    });

    await newRestaurant.save();
    res.status(201).json({ message: 'Restaurant registered successfully', newRestaurant });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Log in a restaurant owner
const loginRestaurant = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the restaurant owner by email
    const restaurant = await Restaurant.findOne({ email });
    if (!restaurant) {
      return res.status(400).json({ message: 'Restaurant owner not found' });
    }

    // Check if the restaurant owner is blocked
    if (restaurant.status === 'blocked') {
      return res.status(403).json({ message: 'Account is blocked. Please contact support.' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, restaurant.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.json({ message: 'Restaurant owner logged in', restaurant});
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Upload profile picture for a restaurant
const uploadProfilePicture = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant owner not found' });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'restaurant_profile_pictures',
    });

    // Save image URL in the restaurant document
    restaurant.profilePictureUrl = result.secure_url;
    await restaurant.save();
x
    res.json({ message: 'Profile picture uploaded successfully', profilePictureUrl: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const updateRestaurantInfo = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    // Validate the restaurantId
    if (!mongoose.isValidObjectId(restaurantId)) {
      return res.status(400).json({ message: 'Invalid restaurant ID format' });
    }

    // Find the restaurant and update
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $set: req.body }, // Update with fields provided in the request body
      { new: true, runValidators: true } // Return the updated document
    ).lean(); // Converts MongoDB document to a plain JS object

    if (!updatedRestaurant) {
      return res.status(404).json({ message: 'Restaurant owner not found' });
    }

    // Send the complete restaurant object in response
    res.json({
      message: 'Restaurant information updated successfully',
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



module.exports = { registerRestaurant, loginRestaurant , uploadProfilePicture ,updateRestaurantInfo};
