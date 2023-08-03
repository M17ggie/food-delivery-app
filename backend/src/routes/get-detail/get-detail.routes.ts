import express from "express";
import { getRestaurantExecutiveDetail } from "../../controllers/list/list.controller";
import { adminOnly } from "../../middleware/protected.middleware";

const router = express.Router();

router.route("/:userType").get(adminOnly, getRestaurantExecutiveDetail);


module.exports = router