const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.controller');
const authController = require('../controllers/authenticate.controller');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication and Authorization
 */

/**
 * @swagger
 * path:
 *  /login:
 *    post:
 *      summary: Authenticate user credentails
 *      tags: [Authentication]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              
 *      responses:
 *        "200":
 *          description: test
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Auth'
 */
router.post('/login', usersController.getUser, authController.authenticate);

// new access token from refresh token 
router.post('/token', authController.getRefreshTokenFromDb, authController.newAuthTokenFromRefreshToken);

// remove user refresh token from DB
router.delete('/logout', authController.getRefreshTokenFromDb, authController.removeAuthentication);

module.exports = router;