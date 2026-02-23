import { type Request, type Response } from 'express'
import { googleAuth } from '../services/googleAuth.service.js';
import redisClient from '../config/redis.config.js'
import { prisma } from '../config/prisma.client.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jose.utilts.js';
import { getEnv } from '../config/env.config.js';
import { githubAuth } from '../services/githubAuth.service.js';

const FRONTEND_URL = getEnv("FRONTEND_URL");
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

        const user = await prisma.user.findUnique({
            where: {
                email: userInfo.email
            }
        })

        if (user) {
            const accessToken = await generateAccessToken(user.email);

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 1000 * 60 * 15
            });

            return res.redirect(`${FRONTEND_URL}/problems`)
        }

        // save user in database skipping storing image in database 
        // right now because of lack of bucket
        const accessToken = await generateAccessToken(userInfo.email);
        const refreshToken = await generateRefreshToken(userInfo.email);
        
        const newUser = await prisma.user.create({
            data: {
                email: userInfo.email,
                name: userInfo.name,
                refreshToken: refreshToken, 
                accounts: {
                    create: {
                        provider: "GOOGLE",
                        email: userInfo.email, 
                        providerId: userInfo.sub
                    }
                }
            },
            include: {
                accounts: true
            } 
        })

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 15
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7
        });
        
        return res.redirect(`${FRONTEND_URL}/problems`)
    } catch (error) {
        console.log("something went wrong while loggin with google");
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const email = req.user.email;

        const user = await prisma.user.findUnique({
            where: {
                email
            }, 
            select: {
                name: true, 
                email: true, 
                profilePic: true
            }
        })

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.json({
            message: "User found",
            data: {
                user
            }
        });
    } catch (error) {
        console.log("something went wrong while getting user");
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const githubLogin = async (req: Request, res: Response) => {
    try {
        const authUrl = githubAuth.getAuthorizationUrl();

        return res.redirect(authUrl.toString());
    } catch (error) {
        console.log("something went wrong while loggin with github");
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const githubCallback = async (req: Request, res: Response) => {
    try {
        const {code} = req.query;
        const idToken = await githubAuth.exchangeCode(code as string);
        const userInfo = githubAuth.getUserInfo(idToken);

        const user = await prisma.user.findUnique({
            where: {
                email: userInfo.email
            }
        })

        if (user) {
            const accessToken = await generateAccessToken(user.email);

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 1000 * 60 * 15
            });

            return res.redirect(`${FRONTEND_URL}/problems`)
        }

        // save user in database skipping storing image in database 
        // right now because of lack of bucket
        const accessToken = await generateAccessToken(userInfo.email);
        const refreshToken = await generateRefreshToken(userInfo.email);
        
        const newUser = await prisma.user.create({
            data: {
                email: userInfo.email,
                name: userInfo.name,
                refreshToken: refreshToken, 
                accounts: {
                    create: {
                        provider: "GITHUB",
                        email: userInfo.email, 
                        providerId: userInfo.sub
                    }
                }
            },
            include: {
                accounts: true
            } 
        })

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 15
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7
        });
        
        return res.redirect(`${FRONTEND_URL}/problems`)
    } catch (error) {
        console.log("something went wrong while loggin with github");
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}