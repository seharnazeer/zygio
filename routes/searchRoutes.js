const express = require('express');
const router = express.Router();
const searchController = require('../controller/searchController');

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search food items and restaurants
 *     parameters:
 *       - name: q
 *         in: query
 *         description: Search query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/search', searchController.search);

module.exports = router;
