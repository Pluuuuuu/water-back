const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const wishlistController = require('../controllers/wishlistController');

const router = express.Router();

router.post('/add', verifyToken, wishlistController.addToWishlist); // Add product to wishlist
router.delete('/remove/:id', verifyToken, wishlistController.removeFromWishlist); // Remove product from wishlist
router.get('/', verifyToken, wishlistController.getUserWishlist); // Get wishlist items for a user

module.exports = router;
