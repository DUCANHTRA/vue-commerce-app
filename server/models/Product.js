const mongoose = require('mongoose');

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

module.exports = mongoose.model('Product', ProductSchema);
