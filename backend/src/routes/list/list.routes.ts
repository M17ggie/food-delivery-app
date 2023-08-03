import express from "express";
import { getListHandler } from "../../controllers/list/list.controller";
import { adminOnly } from "../../middleware/protected.middleware";

const router = express.Router();

router.route("/").get(adminOnly, getListHandler);



module.exports = router