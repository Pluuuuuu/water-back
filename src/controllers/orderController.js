const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');

// Place a new order
exports.placeOrder = async (req, res) => {
  const { cartItems } = req.body; // Array of cart items with quantity
  try {
    const order = await Order.create({ user_id: req.user.id, status: 'Pending' });
    for (const item of cartItems) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      await OrderItem.create({
        order_id: order.id,
        product_id: item.productId,
        quantity: item.quantity,
        price: product.price,
      });
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
};

// View all orders
exports.viewAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { user_id: req.user.id } });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
};

// Update order status (Admin only)
exports.updateOrderStatus = async (req, res) => {
  const { id, status } = req.body;
  try {
    const order = await Order.findByPk(id);
    if (order) {
      order.status = status;
      await order.save();
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
};
