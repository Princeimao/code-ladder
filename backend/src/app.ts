import express, { type Request, type Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { getEnv } from "./config/env.config.js";
import { apiLimiter, authLimiter } from "./middlewares/ratelimit.js";
import helmet from "helmet";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: getEnv("FRONTEND_URL"),
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(apiLimiter);
app.use("/auth", authLimiter);
app.use(helmet());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});


// import routes
import judgementRoutes from "./routes/judgement.routes.js";

app.use("/api/judgement", judgementRoutes);