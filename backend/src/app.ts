const express = require('express');
const path = require('path')

const envPath = path.resolve(__dirname, 'config', '.env')
require('dotenv').config({ path: envPath });

const app = express();
app.use(express.json())

const auth = require('./routes/auth/authRoutes');
const errorHandler = require('./middleware/error')

app.use('/api/v1/auth', auth);
app.use(errorHandler);

export default app