import Product from '../models/Product.js';
import connectDB from '../config/db.js';

/**
 * Get all products or distinct categories
 */
export const getProducts = async (req, res) => {
  try {
    await connectDB();
    const { category, limit, categories } = req.query;

    if (categories === 'true') {
      const distinctCategories = await Product.distinct('category');
      return res.json({ success: true, data: distinctCategories });
    }

    const query = category ? { category } : {};
    let productsQuery = Product.find(query);

    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum) && limitNum > 0) {
        productsQuery = productsQuery.limit(limitNum);
      }
    }

    const products = await productsQuery.exec();
    res.json({
      success: true,
      data: products,
      message: products.length === 0 ? 'No products found' : undefined,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get a product by ID
 */
export const getProductById = async (req, res) => {
  try {
    await connectDB();
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Create a new product
 */
export const createProduct = async (req, res) => {
  try {
    await connectDB();
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, id: product._id });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Update a product
 */
export const updateProduct = async (req, res) => {
  try {
    await connectDB();
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Delete a product
 */
export const deleteProduct = async (req, res) => {
  try {
    await connectDB();
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    await product.deleteOne();
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Increment likes for a product
 */
export const likeProduct = async (req, res) => {
  try {
    await connectDB();
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
