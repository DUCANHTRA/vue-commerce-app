const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

// Routes
router.get('/:id', userController.getUserById);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;
