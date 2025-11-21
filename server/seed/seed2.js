import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Product from '../models/Product.js'; // update path if needed

// New image data (id not needed — match by title)
const updatedImages = [
  { title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops", image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png" },
  { title: "Mens Casual Premium Slim Fit T-Shirts", image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png" },
  { title: "Mens Cotton Jacket", image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png" },
  { title: "Mens Casual Slim Fit", image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png" },

  { title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet", image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png" },
  { title: "Solid Gold Petite Micropave", image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png" },
  { title: "White Gold Plated Princess", image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png" },
  { title: "Pierced Owl Rose Gold Plated Stainless Steel Double", image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png" },

  { title: "WD 2TB Elements Portable External Hard Drive - USB 3.0", image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png" },
  { title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s", image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png" },
  { title: "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5", image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_t.png" },
  { title: "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive", image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png" },
  { title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin", image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png" },
  { title: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED", image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_t.png" },

  { title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats", image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png" },
  { title: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket", image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png" },
  { title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats", image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png" },
  { title: "MBJ Women's Solid Short Sleeve Boat Neck V", image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png" },
  { title: "Opna Women's Short Sleeve Moisture", image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_t.png" },
  { title: "DANVOUY Womens T Shirt Casual Cotton Short", image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png" }
];

dotenv.config();
await connectDB();

const seedData2 = async () => {
  try {
    
    for (const item of updatedImages) {
      const updated = await Product.findOneAndUpdate(
        { title: item.title },
        { $set: { image: item.image } }
      );

      if (updated) {
        console.log(`🌱✔ Updated: ${item.title}🌱`);
      } else {
        console.log(`⚠️✖ Not found: ${item.title}⚠️`);
      }
    }

    console.log("🎉 Image updates completed!");
    process.exit();
  } catch (error) {
      console.error(`🚨 Error seeding data: ${error.message} 🚨`);
      process.exit(1);
    } finally {
      await mongoose.connection.close();
      console.log('🔌 Database connection closed 🔌');
    }
}

seedData2();
