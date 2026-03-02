import mongoose from 'mongoose'
import { getEnv } from './env.config.js'

const MONGO_URI = getEnv("MONGO_URI")

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
