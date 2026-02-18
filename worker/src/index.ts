import { JudgeService } from "./services/judge.service.js";
import "dotenv/config";

const judgeService = new JudgeService();

judgeService.runner({
    questionId: "1",
    language: "javascript",
    code: "console.log('Hello World');",
    userId: "1"
});