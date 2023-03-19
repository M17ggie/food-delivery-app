const express = require('express');
require('dotenv').config();

const app = express();

const authRouter = require('./routes/auth/authRoutes')

app.use('/login',authRouter)

export default app