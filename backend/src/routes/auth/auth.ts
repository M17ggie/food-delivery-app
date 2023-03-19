const express = require('express');
import { loginHandler } from "../../controllers/auth/authControllers";

const router = express.Router();

router.route('/login').post(loginHandler)

router.route('/register')

module.exports = router