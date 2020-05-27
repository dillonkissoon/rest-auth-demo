const express = require('express');
const router = express.Router();
const userscontroller = require('../controllers/users.controller');
const authController = require('../controllers/authenticate.controller');

// GET user by Id
router.get('/:id', authController.authenticateToken, userscontroller.findUserById);

// Create New User
router.post('/register', userscontroller.getUser, userscontroller.register);

module.exports = router;