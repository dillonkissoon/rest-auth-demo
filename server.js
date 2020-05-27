require('dotenv').config();

const express = require('express');
const app = express();
const router = require('./routes/routes');

require('./db'); // set to const if interaction with DB needed

app.use(express.json());

// API methods
app.use('/api', router);

app.listen(3000);