const FoodItem = require('../models/fooditem');
const Restaurant = require('../models/restaurant');

exports.search = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const foodItems = await FoodItem.find({
      dishName: { $regex: query, $options: 'i' },
    }).populate('restaurant', 'restaurantName location');

    const restaurants = await Restaurant.find({
      restaurantName: { $regex: query, $options: 'i' },
    });

    res.status(200).json({ foodItems, restaurants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
