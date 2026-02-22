import type { User } from "./src/middlewares/auth.middleware.ts";

declare global {
    namespace Express {
        interface Request {
            user: User
        }
    }
}