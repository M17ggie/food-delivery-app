import express from 'express';
import { userLoginHandler, userRegisterHandler, restaurantLoginHandler, restaurantRegisterHandler } from "../../controllers/auth/authController";

const router = express.Router();

//user auth
router.route('/user/login').post(userLoginHandler)
router.route('/user/register').post(userRegisterHandler)

//restaurant auth
router.route('/restaurant/login').post(restaurantLoginHandler)
router.route('/restaurant/register').post(restaurantRegisterHandler)

module.exports = router