const express = require('express');
const path = require('path')

const envPath = path.resolve(__dirname, 'config', '.env')
require('dotenv').config({ path: envPath });

const app = express();
app.use(express.json())

const auth = require('./routes/auth/authRoutes');
const authErrorHandler = require('./middleware/authError')

//authentication
app.use('/api/v1/auth', auth);
app.use(authErrorHandler);

export default app