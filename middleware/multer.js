// middleware/multer.js
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({});
const upload = multer({ storage });

module.exports = upload;
