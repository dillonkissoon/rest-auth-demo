const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.controller');
const authController = require('../controllers/authenticate.controller');

// authenticate user credentials
router.post('/login', usersController.getUser, authController.authenticate);

// new access token from refresh token 
router.post('/token', authController.getRefreshTokenFromDb, authController.newAuthTokenFromRefreshToken);

// remove user refresh token from DB
router.delete('/logout', authController.getRefreshTokenFromDb, authController.removeAuthentication);

module.exports = router;