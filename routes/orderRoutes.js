const express = require('express');
const { createOrder, getUserOrders, getOrderById, updateOrderStatus, getRestaurantOrders } = require('../controller/orderController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Endpoints related to order management
 */

/**
 * @swagger
 * /api/orders/create:
 *   post:
 *     summary: Creates a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user placing the order
 *               restaurantId:
 *                 type: string
 *                 description: ID of the restaurant
 *               foodItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     foodItem:
 *                       type: string
 *                       description: ID of the food item
 *                     quantity:
 *                       type: number
 *                       description: Quantity of the food item
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post('/create', createOrder);

/**
 * @swagger
 * /api/orders/user/{userId}:
 *   get:
 *     summary: Gets all orders for a specific user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user orders
 */
router.get('/user/:userId', getUserOrders);

/**
 * @swagger
 * /api/orders/restaurant/{restaurantId}:
 *   get:
 *     summary: Gets all orders for a specific restaurant
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         description: ID of the restaurant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of restaurant orders
 */
router.get('/restaurant/:restaurantId', getRestaurantOrders);

/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Gets details of a specific order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: ID of the order
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details retrieved successfully
 */
router.get('/:orderId', getOrderById);

/**
 * @swagger
 * /api/orders/{orderId}/status:
 *   put:
 *     summary: Updates the status of a specific order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: ID of the order
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: New status for the order (e.g., "completed", "cancelled")
 *     responses:
 *       200:
 *         description: Order status updated successfully
 */
router.put('/:orderId/status', updateOrderStatus);

module.exports = router;
