import "dotenv/config"
import { app } from "./app.js"
import { getEnv } from "./config/env.config.js";
import path from "path";

const port = getEnv("PORT");

(function () {
    try {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
})()