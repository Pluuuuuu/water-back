const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware'); // Middleware to verify JWT token
const cartController = require('../controllers/cartController');

const router = express.Router();

router.post('/add', verifyToken, cartController.addToCart); // Add product to cart
router.put('/update/:productId', verifyToken, cartController.updateCartItem); // Update quantity of product in cart
//router.put('/update/:id', verifyToken, cartController.updateCartItem); // Update quantity of product in cart
router.delete('/remove/:productId', verifyToken, cartController.removeFromCart); // Remove product from cart
router.get("/", verifyToken, cartController.viewCart); // Get cart items for a user


module.exports = router;
