import { Router } from "express";
import { judgement, test } from "../controller/judge.controller.js";

const router = Router();

router.route("/run").post(judgement);

export default router;