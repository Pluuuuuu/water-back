const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.post('/add', verifyToken, reviewController.addReview); // Add a review
router.put('/update/:id', verifyToken, reviewController.updateReview); // Update review
router.delete('/delete/:id', verifyToken, reviewController.deleteReview); // Delete review
router.get('/:productId', reviewController.getProductReviews); // Get reviews for a product

module.exports = router;
