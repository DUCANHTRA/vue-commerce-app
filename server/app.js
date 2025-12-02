import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();


// CORS setup
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",   // Your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
//Use express.json() middleware to parse JSON requests automatically
app.use(express.json());


app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

export default app;

//Key Idea:
//Router and Middleware Manager
//Does not start the server