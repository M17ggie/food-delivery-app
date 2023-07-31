import express from 'express';
import { getUserInfoHandler, logoutStateHandler, restaurantLoginHandler, restaurantRegisterHandler, userLoginHandler, userRegisterHandler } from "../../controllers/auth/auth.controller";
import { authenticatedOnly } from '../../middleware/protected.middleware';

const router = express.Router();

//user auth
router.route('/user/login').post(userLoginHandler)
router.route('/user/register').post(userRegisterHandler)

//restaurant auth
router.route('/restaurant/login').post(restaurantLoginHandler)
router.route('/restaurant/register').post(restaurantRegisterHandler)

//get user info
router.route('/:userType/get-user').get(authenticatedOnly, getUserInfoHandler)

//logout
router.route('/logout').get(logoutStateHandler)

module.exports = router