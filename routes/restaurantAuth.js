// routes/restaurantAuth.js
const express = require('express');
const router = express.Router();
const { registerRestaurant, loginRestaurant , updateRestaurantInfo, uploadProfilePicture } = require('../Controller/restaurantAuth');
const upload = require('../middleware/multer');

/**
 * @swagger
 * tags:
 *   name: Restaurant
 *   description: Endpoints related to restaurant management
 */

/**
 * @swagger
 * /api/restaurant/register:
 *   post:
 *     summary: Registers a new restaurant owner
 *     tags: [Restaurant]
 *     responses:
 *       201:
 *         description: New restaurant owner is registered
 */
router.post('/register', registerRestaurant);

/**
 * @swagger
 * /api/restaurant/login:
 *   post:
 *     summary: Logs in a restaurant owner
 *     tags: [Restaurant]
 *     responses:
 *       200:
 *         description: Restaurant owner logged in
 */
router.post('/login', loginRestaurant);

/**
 * @swagger
 * /api/restaurant/{id}/uploadProfilePicture:
 *   post:
 *     summary: Uploads a profile picture for a restaurant owner
 *     tags: [Restaurant]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profile picture uploaded successfully
 */
router.post('/:id/uploadProfilePicture', upload.single('profilePicture'), uploadProfilePicture);

/**
 * @swagger
 * /api/restaurant/{id}/updateInfo:
 *   patch:
 *     summary: Update restaurant user info
 *     tags: [Restaurant]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant information updated successfully
 */
router.patch('/:id/updateInfo', updateRestaurantInfo);

module.exports = router;
