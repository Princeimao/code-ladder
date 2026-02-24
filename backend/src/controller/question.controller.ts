import { Question } from "../models/question.model.js"
import { type Request, type Response } from "express"

export const getQuestions = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 30 } = req.query;

        const documents = (Number(page) - 1 ) * Number(limit);
        const questions = await Question.find()
                                .limit(Number(limit))
                                .skip(documents)
                                .select("title difficulty _id company")
                                .populate("company");

        const totalQuestions = await Question.countDocuments();
        const totalPages = Math.ceil(totalQuestions / Number(limit));
        const hasMore = Number(page) < totalPages;
        
        res.status(200).json({
            success: true,
            message: "Questions fetched successfully",
            data: {
                questions,
                totalPages,
                hasMore
            }
        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: "Internal server error" 
        })
    }
}

export const getQuestionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const question = await Question.findById(id).populate("company").populate("topic");
        if (!question) {
            return res.status(404).json({
                success: false,
                error: "Question not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Question fetched successfully",
            data: question
        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: "Internal server error" 
        })
    }
}

// a controller for creating questions
// a controller for updating questions
// a controller for deleting questions