import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    questions: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }
})

export const Company = mongoose.model("Company", companySchema)