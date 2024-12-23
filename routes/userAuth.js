const express = require('express');
const router = express.Router();
const { registerUser, loginUser, uploadProfilePicture, updateUserInfo } = require('../Controller/userController');
const upload = require('../middleware/multer');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints related to user management
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Registers a new user
 *     tags: [User]
 *     responses:
 *       201:
 *         description: New user is registered
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Logs in a user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User logged in
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/user/{id}/uploadProfilePicture:
 *   post:
 *     summary: Uploads a profile picture for a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profile picture uploaded successfully
 */
router.post('/:id/uploadProfilePicture', upload.single('profilePicture'), uploadProfilePicture);

/**
 * @swagger
 * /api/user/{id}/updateInfo:
 *   patch:
 *     summary: Update user info
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User information updated successfully
 */
router.patch('/:id/updateInfo', updateUserInfo);

module.exports = router;
