const express = require('express');
import { loginUserHandler, registerUserHandler } from "../../controllers/auth/authController";

const router = express.Router();
router.route('/login').post(loginUserHandler)

router.route('/register').post(registerUserHandler)

module.exports = router