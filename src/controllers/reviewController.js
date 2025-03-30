const Review = require('../models/Review');
const Product = require('../models/Product');

// Add a review
exports.addReview = async (req, res) => {
  const { productId, rating, comment } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const review = await Review.create({
      user_id: req.user.id,
      product_id: productId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add review' });
  }
};

// Get reviews for a product
exports.getProductReviews = async (req, res) => {
  const { productId } = req.params;
  try {
    const reviews = await Review.findAll({ where: { product_id: productId } });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve reviews' });
  }
};
