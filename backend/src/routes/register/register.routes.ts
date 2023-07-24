import express from 'express';
import { registerRestaurantDetailsHandler } from '../../controllers/register/register.controller';

const router = express.Router();

//restaurant details
router.route('/restaurant/details').post(registerRestaurantDetailsHandler)

module.exports = router