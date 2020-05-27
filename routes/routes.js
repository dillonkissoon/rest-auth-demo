const express = require('express');
const apiRouter = express.Router();

const usersRouter = require('./users.route');
const authRouter = require('./authenticate.route');

apiRouter.use('/users', usersRouter);
// apiRouter.use(authRouter);

module.exports = apiRouter;