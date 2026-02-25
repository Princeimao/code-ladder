import { type Request, type Response } from "express";
import { prisma } from "../config/prisma.client.js";

export const user = async (req: Request, res: Response) => {
    try {
        const email = req.user.email;

        const user = await prisma.user.findUnique({
            where: {
                email
            },
            select: {
                name: true,
                email: true,
                profilePic: true
            }
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User found",
            data: {
                user
            }
        });
    } catch (error) {
        console.log("something went wrong while getting user");
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const userSubmissions = async (req: Request, res: Response) => {
    try {
        const email = req.user.email;

        const user = await prisma.user.findUnique({
            where: {
                email
            },
            include: {
                submissions: true, 
            },
        })

        const rawSubmission = user && user.submissions.length > 10 ? user.submissions.slice(0, 10) : user?.submissions;
        const submission = rawSubmission && rawSubmission.map((sub) => {
            return {
                id: sub.id,
                status: sub.status,
                title: sub.title,
                questionId: sub.questionId,
                createdAt: sub.createdAt,
            }
        })
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User found",
            data: {
                submission
            }
        });
    } catch (error) {
        console.log("something went wrong while getting user submissions");
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
