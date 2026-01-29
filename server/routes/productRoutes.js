import express from 'express';
import { 
    getProducts,
    getProductById,
    likeProduct
 } from '../controllers/productControllers.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id/like', likeProduct);

export default router;
