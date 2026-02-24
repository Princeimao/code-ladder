import { Router } from "express";
import { githubCallback, githubLogin, googleCallback, googleLogin } from "../controller/auth.controller.js";

const router = Router();

router.route("/google").get(googleLogin);
router.route("/callback").get(googleCallback);
router.route("/github").get(githubLogin);
router.route("/github/callback").get(githubCallback);

export default router;