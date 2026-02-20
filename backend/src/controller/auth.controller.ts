import { type Request, type Response } from 'express'
import { googleAuth } from '../services/auth.service.js';
import { getEnv } from '../config/env.config.js';
import redisClient from '../config/redis.config.js'


export const googleLogin = async (req: Request, res: Response) => {
    try {
        const {authUrl, codeVerifier, state} = googleAuth.getAuthorizationUrl();
        await redisClient.set(`oauth:${state}`, codeVerifier);
        await redisClient.expire(`oauth:${state}`, 60 * 15);

        return res.redirect(authUrl.toString());
    } catch (error) {
        console.log("something went wrong while loggin with google");
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const googleCallback = async (req: Request, res: Response) => {
    try {
        const {code, state} = req.query;
        const codeVerifier = await redisClient.get(`oauth:${state}`);
        if (!codeVerifier) {
            return res.status(400).json({
                message: "Invalid state"
            });
        }

        const idToken = await googleAuth.exchangeCode(code as string, codeVerifier);
        const userInfo = googleAuth.getUserInfo(idToken);
        return res.json({
            message: "User logged in successfully",
            userInfo
        });
    } catch (error) {
        console.log("something went wrong while loggin with google");
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}