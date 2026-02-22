import { Router } from "express";
import { googleCallback, googleLogin } from "../controller/auth.controller.js";

const router = Router();

router.route("/google").get(googleLogin);
router.route("/callback").get(googleCallback);

export default router;