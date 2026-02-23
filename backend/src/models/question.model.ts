import mongoose, { Mongoose } from "mongoose";

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    example: [
        {
            input: {
                type: String,
                required: true
            },
            output: {
                type: String,
                required: true
            }
        }
    ], 
    constraints: [{
        type: String,
        required: true
    }], 
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
        required: true
    }, 
    companies: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    }, 
    testCases: [
        {
            input: {
                type: String,
                required: true
            },
            output: {
                type: String,
                required: true
            }
        }
    ], 
    followUps: {
        type: String, 
        required: true
    }
});

export const Question = mongoose.model("Question", questionSchema);