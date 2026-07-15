const express = require('express');
const route = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorizeMiddleware');
const adminController = require('../controllers/adminController');
route.get('/showusers', authMiddleware, authorize("admin"), (req, res) => {
    adminController.getUsers(req, res);
});

module.exports = route;