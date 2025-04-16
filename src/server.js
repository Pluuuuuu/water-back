const express = require('express');
const { sequelize } = require('./config/db'); // Importing Sequelize connection
require('dotenv').config(); // Load environment variables

// Importing Routes
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require( './routes/userRoutes' );
const cartRoutes = require('./routes/cartRoutes');
const cors = require("cors");
const app = express();

const allowedOrigins = [
  "https://frontend-water-yu71.vercel.app",
  "http://localhost:5173", 
];

app.use(
cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 600,
} )
);

app.use(express.json()); // Middleware for parsing JSON requests

app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// API Test Route
app.get('/', (req, res) => res.send('API is working!'));

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use( '/api/users', userRoutes );
app.use("/api/cart", cartRoutes);

// Start Server After DB Connection
const PORT = process.env.PORT || 5000;
sequelize.authenticate()
  .then(() => {
    console.log('Database connected!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Database connection error:', err));
