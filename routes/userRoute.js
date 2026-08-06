const express = require('express');
const route = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const userController = require('../controllers/userController');
const registerValidation = require('../middleware/validationMiddleware');
route.get('/', userController.showLoginPage);
route.get('/home', authMiddleware, userController.showHomePage);
route.get('/register', userController.showRegisterPage);
route.get('/login', userController.showLoginPage);
route.get('/logout', authMiddleware,userController.logout);
route.get('/profile',authMiddleware,userController.showProfile)
route.post('/register', registerValidation,userController.registerUser);
route.post('/login', userController.loginUser);
route.get("/change-password", authMiddleware, userController.showChangePasswordPage);
route.post("/change-password", authMiddleware, userController.changePassword);
route.get("/profile/edit", authMiddleware, userController.showEditProfilePage);
route.post("/profile/edit", authMiddleware, userController.updateProfile);
module.exports = route; 