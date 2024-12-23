// // index.js
// const express = require('express');
// const swaggerUi = require('swagger-ui-express');
// const swaggerJsdoc = require('swagger-jsdoc');
// const dotenv = require('dotenv');
// const db = require('./db');  // Database connection
// // const contactRoutes = require('./routes/contact');
// // Add other routes as needed

// dotenv.config();

// const app = express();
// app.use(express.json());

// // Swagger configuration
// const swaggerOptions = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'CRM Backend API',
//       version: '1.0.0',
//       description: 'API documentation for CRM Backend',
//     },
//   },
//   apis: ['./routes/*.js'],
// };
// const swaggerDocs = swaggerJsdoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// // Routes for Restuarants
// // app.use('/api/authrestaurant', authRestaurants);

// // Restaurant Auth Routes
// const restaurantAuthRoutes = require('./routes/restaurantAuth');
// app.use('/api/restaurant', restaurantAuthRoutes);

// // Add other routes



// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
//   console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
// });


// index.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const dotenv = require('dotenv');
const connectDB = require('./db'); // Database connection

const app = express();
dotenv.config();
const cors = require('cors');
app.use(cors());  

app.use(express.json());

// Connect to MongoDB
connectDB();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Deibibelly',
      version: '1.0.0',
      description: 'API documentation for CRM Backend',
    },
  },
  apis: ['./routes/*.js'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Restaurant Auth Routes
const restaurantAuthRoutes = require('./routes/restaurantAuth');
const foodItemRoutes = require('./routes/foodItemRoutes'); // New food item routes
const userAuthRoutes = require('./routes/userAuth');
const orderRoutes = require('./routes/orderRoutes');
const searchRoutes = require('./routes/searchRoutes');



app.use('/api/restaurant', restaurantAuthRoutes);
app.use('/api/foodItem', foodItemRoutes); 
app.use('/api/user', userAuthRoutes);
app.use('/api/orders', orderRoutes);

app.use('/api', searchRoutes);



// Start the server
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
