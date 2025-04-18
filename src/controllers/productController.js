// Import models and database configuration
const db = require("../config/db"); // Import db.js to ensure associations are loaded
const Product = require("../models/Product");
const Category = require("../models/Category");
const Cart = require("../models/Cart");

// Add a product (Admin only)
const addProduct = async (req, res) => {
  const { name, description, price, stock, categoryId, images } = req.body;
  try {
    // Check if the categoryId exists
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Create product and associate with categoryId
    const defaultImage = "https://via.placeholder.com/300x200?text=No+Image";

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      images: images || defaultImage,
      category_id: categoryId, // Ensure the categoryId is correctly set
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all products (For customers)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }], // Include Category model with proper association
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single product by ID (For customers)
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id, {});
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get products by category (For customers)
const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await Product.findAll({
      where: { category_id: categoryId },
      include: [{ model: Category }], // Include Category model with proper association
    });
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve products by category", error });
  }
};

// Edit a product (Admin only)
const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a product (Admin only)
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    // ✅ This removes the product from all carts before deleting the product itself
    await Cart.destroy({ where: { product_id: id } });
    // ✅ Now it's safe to delete the product
    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (error) {
console.error("Error deleting product:", error);
res.status(500).json({ message: "Failed to delete product" });  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
};
