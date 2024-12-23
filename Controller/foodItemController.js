// Controller/foodItemController.js
const FoodItem = require('../models/fooditem');
const Restaurant = require('../models/restaurant');
const mongoose = require('mongoose');
const cloudinary = require('../cloudinaryConfig');




// Update a food item by restaurant
const updateFoodItem = async (req, res) => {
  try {
    const { foodItemId } = req.params;
    const { dishName, originalPrice, discountPrice, piecesLeft, description, restaurantLocation, availability } = req.body;

    // Find the food item
    let foodItem = await FoodItem.findById(foodItemId);
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    // Check if the restaurant ID matches (authorization check)
    if (foodItem.restaurant.toString() !== req.body.restaurantId) {
      return res.status(403).json({ message: 'Unauthorized to update this food item' });
    }

    // Upload new image to Cloudinary if a new file is provided
    let imageUrl = foodItem.imageUrl; // Default to current image URL
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'food_items',
      });
      imageUrl = result.secure_url;
    }

    // Update the food item
    foodItem = await FoodItem.findByIdAndUpdate(
      foodItemId,
      {
        dishName,
        imageUrl,
        originalPrice,
        discountPrice,
        piecesLeft,
        availability,
        description,
        restaurantLocation,
      },
      { new: true, runValidators: true }
    );

    res.json({ message: 'Food item updated successfully', foodItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a food item by restaurant
const deleteFoodItem = async (req, res) => {
  try {
    const { foodItemId } = req.params;

    // Find the food item
    const foodItem = await FoodItem.findById(foodItemId);
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    // Check if the restaurant ID matches (authorization check)
    if (foodItem.restaurant.toString() !== req.body.restaurantId) {
      return res.status(403).json({ message: 'Unauthorized to delete this food item' });
    }

    // Delete the food item
    await foodItem.remove();
    res.json({ message: 'Food item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};



// Add a new food item
const addFoodItem = async (req, res) => {
  try {
    const { restaurantId, imageUrl ,dishName, originalPrice, discountPrice, piecesLeft, description , restaurantLocation, availability} = req.body;

    // Find the associated restaurant
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Create the food item
    const foodItem = new FoodItem({
      dishName,
      imageUrl,
      restaurant: restaurant,
      restaurantName: restaurant.email,  // or use any other attribute of Restaurant
      restaurantLocation,
      originalPrice,
      discountPrice,
      piecesLeft,
      availability,
      description,
    });


    await foodItem.save();
    res.status(201).json({ message: 'Food item added successfully', foodItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all food items
const getAllFoodItems = async (req, res) => {
  try {

    const foodItems = await FoodItem.find().populate('restaurant', 'name location');

    res.json(foodItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get food items by restaurant
const getFoodItemsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Find food items and populate the 'restaurant' field with the full Restaurant object
    const foodItems = await FoodItem.find({ restaurant: restaurantId }).populate('restaurant');
    res.json(foodItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


module.exports = { addFoodItem, getAllFoodItems, getFoodItemsByRestaurant, updateFoodItem, deleteFoodItem };

