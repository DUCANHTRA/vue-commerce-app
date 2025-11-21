import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number
  },
  likes: { type: Number, default: 0 }  // ← NEW
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
export default Product;
