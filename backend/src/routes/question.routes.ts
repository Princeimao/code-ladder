import { Router } from "express";
import { getQuestionById, getQuestions } from "../controller/question.controller.js";

const router = Router();

router.route("/get-questions").get(getQuestions);
router.route("/:questionId").get(getQuestionById);

export default router;
