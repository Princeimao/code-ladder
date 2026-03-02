import "dotenv/config"
import { app } from "./app.js"
import { getEnv } from "./config/env.config.js";
import { connectDB } from "./config/mongoose.connection.js";

const port = getEnv("PORT");

(async function () {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
})()