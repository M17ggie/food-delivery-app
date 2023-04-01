const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
import cors from 'cors';

const envPath = path.resolve(__dirname, 'config', '.env')
require('dotenv').config({ path: envPath });

const app = express();

//cors
app.use(cors())

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