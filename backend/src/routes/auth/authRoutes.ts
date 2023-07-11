import express from 'express';
import { userLoginHandler, userRegisterHandler, restaurantLoginHandler, restaurantRegisterHandler, logoutHandler, getUserInfoHandler } from "../../controllers/auth/authController";
import { adminOnly } from '../../middleware/protected.middleware';

const router = express.Router();

//user auth
router.route('/user/login').post(userLoginHandler)
router.route('/user/register').post(userRegisterHandler)

//restaurant auth
router.route('/restaurant/login').post(restaurantLoginHandler)
router.route('/restaurant/register').post(restaurantRegisterHandler)

//get user info
router.route('/get-user').get(adminOnly, getUserInfoHandler)

//logout
router.route('/logout').post(logoutHandler)

module.exports = router