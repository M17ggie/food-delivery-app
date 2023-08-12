import express from "express";
import { adminOnly } from "../../middleware/protected.middleware";
import { statusHandler } from "../../controllers/status/status.controller";

const router = express.Router();

router.route("/:userType").patch(adminOnly, statusHandler);

module.exports = router