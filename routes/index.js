// routes/index.js
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Returns a greeting message.
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello, world!"
 */
router.get('/helloword', (req, res) => {
  res.json({ message: 'Hello, world also changed!' });
});

module.exports = router;
