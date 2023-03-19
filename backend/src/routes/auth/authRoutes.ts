const express = require('express');
import { loginHandler } from "../../controllers/auth/authControllers";

const router = express.Router();

router.route('/login').get(loginHandler)

module.exports = router