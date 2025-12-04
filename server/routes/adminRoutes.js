import express from 'express';
import { createProduct, updateProduct, deleteProduct } from '../controllers/productControllers.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// This single middleware applies to all routes in this file
router.use(protect, adminOnly);

router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
