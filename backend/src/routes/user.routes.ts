import { Router } from "express";
import { user, userSubmissions } from "../controller/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/me").get(authMiddleware, user);
router.route("/submission/:userId").get(userSubmissions);

export default router;