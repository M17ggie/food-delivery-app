const express = require('express');
require('dotenv').config();

const app = express();

const auth = require('./routes/auth/auth')

app.use('/api/v1/auth',auth)

export default app