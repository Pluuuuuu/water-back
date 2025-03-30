const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.post('/add', verifyToken, cartController.addToCart); // Add product to cart
router.put('/update/:id', verifyToken, cartController.updateCartItem); // Update quantity of product in cart
router.delete('/remove/:id', verifyToken, cartController.removeFromCart); // Remove product from cart
router.get('/', verifyToken, cartController.getUserCart); // Get cart items for a user

module.exports = router;
