// routes/foodItemRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const { addFoodItem, getAllFoodItems, getFoodItemsByRestaurant, updateFoodItem, deleteFoodItem } = require('../Controller/foodItemController');


/**
 * @swagger
 * tags:
 *   name: FoodItem
 *   description: Endpoints related to food item management
 */

/**
 * @swagger
 * /api/foodItem:
 *   post:
 *     summary: Add a new food item
 *     tags: [FoodItem]
 *     responses:
 *       201:
 *         description: Food item added successfully
 */
router.post('/', upload.single('image'), addFoodItem); // 'image' is the key for the image file


/**
 * @swagger
 * /api/foodItem:
 *   get:
 *     summary: Get all food items
 *     tags: [FoodItem]
 *     responses:
 *       200:
 *         description: Returns an array of food items
 */
router.get('/', getAllFoodItems);

/**
 * @swagger
 * /api/foodItem/restaurant/{restaurantId}:
 *   get:
 *     summary: Get food items by restaurant
 *     tags: [FoodItem]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         description: ID of the restaurant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns an array of food items by restaurant
 */
router.get('/restaurant/:restaurantId', getFoodItemsByRestaurant);

/**
 * @swagger
 * /api/foodItem/{foodItemId}:
 *   patch:
 *     summary: Update a food item by restaurant
 *     tags: [FoodItem]
 *     parameters:
 *       - in: path
 *         name: foodItemId
 *         required: true
 *         description: ID of the food item
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Food item updated successfully
 */
router.patch('/:foodItemId', upload.single('image'), updateFoodItem);

/**
 * @swagger
 * /api/foodItem/{foodItemId}:
 *   delete:
 *     summary: Delete a food item by restaurant
 *     tags: [FoodItem]
 *     parameters:
 *       - in: path
 *         name: foodItemId
 *         required: true
 *         description: ID of the food item
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Food item deleted successfully
 */
router.delete('/:foodItemId', deleteFoodItem);

module.exports = router;
