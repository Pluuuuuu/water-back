const sequelize = require('./sequelize');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Wishlist = require('../models/Wishlist');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Review = require('../models/Review');

// Define Associations

// A User can have many Orders. ; An Order belongs to a User.
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

// A User can have many Cart items. ; Each Cart item belongs to a single User.
// A User can have many Cart items. ; Each Cart item belongs to a single User.
User.hasMany(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });
Cart.belongsTo(Product, { foreignKey: 'product_id' }); //e

// A User can have many Wishlist items. ; Each Wishlist item belongs to a single User.
User.hasMany(Wishlist, { foreignKey: 'user_id' });
Wishlist.belongsTo(User, { foreignKey: 'user_id' });
Wishlist.belongsTo(Product, { foreignKey: 'product_id' }); //e

// A User can have many Reviews. ; A Review belongs to a User.
User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

// A Category can have many Products. ; Each Product belongs to a Category.
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

// A Product can have many Reviews. ; A Review belongs to a Product.
Product.hasMany(Review, { foreignKey: 'product_id' });
Review.belongsTo(Product, { foreignKey: 'product_id' });

// An Order can have many OrderItems. ; Each OrderItem belongs to an Order.
Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

// An OrderItem belongs to a Product. ; A Product can have many OrderItems.
Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

// An OrderItem belongs to a Product. ; A Product can have many OrderItems.
Cart.belongsTo(Product, { foreignKey: 'product_id' });
Wishlist.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = { sequelize, User, Category, Product, Cart, Wishlist, Order, OrderItem, Review };