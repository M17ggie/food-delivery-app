const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
import cors from 'cors';

const envPath = path.resolve(__dirname, 'config', '.env')
require('dotenv').config({ path: envPath });

const app = express();

//cors
app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true
}))

//body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//cookie parser
app.use(cookieParser())

const authRoutes = require('./routes/auth/auth.routes');
const authErrorHandler = require('./middleware/auth-error.middleware');

const registerRoutes = require('./routes/register/register.routes');

const listRoutes = require("./routes/list/list.routes");
const getDetailRoutes = require("./routes/get-detail/get-detail.routes");
const statusRoutes = require("./routes/status/status.routes")

//authentication
app.use('/api/v1/auth', authRoutes);
app.use(authErrorHandler);

app.use('/api/v1/register', registerRoutes);

app.use('/api/v1/get-list', listRoutes);
app.use('/api/v1/get-detail', getDetailRoutes);

app.use('/api/v1/change-status', statusRoutes);

export default app