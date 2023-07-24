const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
import cors from 'cors';
import session from 'express-session'

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

// session
app.use(
    session({
        secret: process.env.SESSION_KEY!,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    })
);

const authRoutes = require('./routes/auth/auth.routes');
const authErrorHandler = require('./middleware/auth-error.middleware');
const registerRoutes = require('./routes/register/register.routes')

//authentication
app.use('/api/v1/auth', authRoutes);
app.use(authErrorHandler);

app.use('/api/v1/register', registerRoutes)

export default app