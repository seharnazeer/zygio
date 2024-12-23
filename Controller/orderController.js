// controllers/OrderController.js
const Order = require('../models/order');
const FoodItem = require('../models/fooditem');
const generateOrderCode = require('../utils/generateOrderCode');

// Create a new order
async function createOrder(req, res) {
  try {
    const { userId, restaurantId, foodItems } = req.body;

    // Calculate total amount
    let totalAmount = 0;
    const items = await Promise.all(
      foodItems.map(async (item) => {
        const food = await FoodItem.findById(item.foodItem);
        totalAmount += food.discountPrice ? food.discountPrice * item.quantity : food.originalPrice * item.quantity;
        return { foodItem: item.foodItem, quantity: item.quantity };
      })
    );

    // Generate a unique 6-digit order code
    const orderCode = generateOrderCode();

    // Create order document
    const order = new Order({
      user: userId,
      restaurant: restaurantId,
      foodItems: items,
      totalAmount,
      orderCode,
    });

    await order.save();

    res.status(201).json({ message: 'Order created successfully', orderCode, orderId: order._id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
}

// Fetch all orders for a user
async function getUserOrders(req, res) {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId })    .populate('foodItems.foodItem').populate('restaurant').populate('user');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
}

// Fetch a specific order by ID
async function getOrderById(req, res) {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate('foodItems.foodItem').populate('restaurant');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
}

// Fetch all orders for a specific restaurant
async function getRestaurantOrders(req, res) {
  try {

    const { restaurantId } = req.params;
    const orders = await Order.find({ restaurant: restaurantId })
      .populate('foodItems.foodItem').populate('restaurant')
      .populate('user'); // assuming user field in the Order schema to link the customer
      console.log(orders);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurant orders', error: error.message });
  }
}

// Update order status (e.g., marking as completed)
async function updateOrderStatus(req, res) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
}

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getRestaurantOrders,
};