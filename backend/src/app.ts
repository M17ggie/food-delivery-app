const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')

const envPath = path.resolve(__dirname, 'config', '.env')
require('dotenv').config({ path: envPath });

const app = express();

//body parser
app.use(express.json())

//cookie parser
app.use(cookieParser())

const authRoutes = require('./routes/auth/authRoutes');
const authErrorHandler = require('./middleware/authError');

//authentication
app.use('/api/v1/auth', authRoutes);
app.use(authErrorHandler);

export default app