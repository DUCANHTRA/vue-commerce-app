import Order from '../models/Order.js';
import Product from '../models/Product.js';
import connectDB from '../config/db.js';

export const createOrder = async (req, res) => {
  try {
    await connectDB();
    const { user, items, total, shippingAddress } = req.body;

    // Check for required fields
    if (!user || !items || !total) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Check stock availability
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product with id ${item.product} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `Not enough stock for ${product.title}` });
      }
    }

    // Create a new order
    const order = new Order({
      user,
      items,
      total,
      shippingAddress
    });

    await order.save();

    // Update stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
