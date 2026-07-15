const express = require('express');
const route = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const userController = require('../controllers/userController');
const registerValidation = require('../middleware/validationMiddleware');
route.get('/home', authMiddleware, userController.showHomePage);
route.get('/register', userController.showRegisterPage);
route.get('/login', userController.showLoginPage);
route.get('/logout', authMiddleware,userController.logout);

route.post('/register', registerValidation,userController.registerUser);
route.post('/login', userController.loginUser);
module.exports = route; 