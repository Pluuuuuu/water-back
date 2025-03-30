const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// Add product to wishlist
exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const wishlistItem = await Wishlist.create({
      user_id: req.user.id,
      product_id: productId,
    });

    res.json(wishlistItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product to wishlist' });
  }
};

// Remove product from wishlist
exports.removeFromWishlist = async (req, res) => {
  const { id } = req.params;
  try {
    const wishlistItem = await Wishlist.findByPk(id);
    if (wishlistItem) {
      await wishlistItem.destroy();
      res.json({ message: 'Item removed from wishlist' });
    } else {
      res.status(404).json({ error: 'Wishlist item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from wishlist' });
  }
};

// View wishlist
exports.viewWishlist = async (req, res) => {
  try {
    const wishlistItems = await Wishlist.findAll({ where: { user_id: req.user.id } });
    res.json(wishlistItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve wishlist items' });
  }
};
