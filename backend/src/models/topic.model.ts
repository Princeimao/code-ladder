import mongoose from 'mongoose'

const topicSchema = new mongoose.Schema({
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

export const Topic = mongoose.model("Topic", topicSchema)