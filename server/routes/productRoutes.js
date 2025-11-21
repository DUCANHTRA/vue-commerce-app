const express = require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");

// Routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.put('/:id/like', productController.likeProduct);

module.exports = router;
