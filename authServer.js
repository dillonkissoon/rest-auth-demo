require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const router = require('./routes/authenticate.route');

require('./db'); // set to const if interaction with DB needed

app.use(cookieParser());
app.use(express.json());

// API methods
app.use('/api', router);

app.listen(4000);

