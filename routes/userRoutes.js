const express = require('express');
const route = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const userController = require('../controllers/userController');
const path = require('path');
route.get('/home', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/home.html"));
})
route.post('/register', userController.registerUser);
route.post('/login', userController.loginUser);
module.exports = route; 