import { type Request, type Response, type NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jose.utilts.js';

export interface User {
    email: string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const decodedToken = await verifyAccessToken(accessToken) as unknown as User;
        req.user = decodedToken;
        next();
    } catch (error) {
        console.log("something went wrong while authenticating");
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}