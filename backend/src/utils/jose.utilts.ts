import * as jose from 'jose'
import { getEnv } from '../config/env.config.js'

export const generateAccessToken = async (email: string) => {
    const JWT_SECRET = getEnv("JWT_SECRET");

    const secret = new TextEncoder().encode(JWT_SECRET)
    const jwt = await new jose.SignJWT({email})
    .setProtectedHeader({alg: "HS256"})
    .setIssuedAt(Date.now())
    .setExpirationTime("15m")
    .sign(secret);

    return jwt;
}

export const generateRefreshToken = async (userId: string) => {
    const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");

    const secret = new TextEncoder().encode(JWT_REFRESH_SECRET)
    const jwt = await new jose.SignJWT({userId})
    .setProtectedHeader({alg: "HS256"})
    .setIssuedAt(Date.now())
    .setExpirationTime("7d")
    .sign(secret);

    return jwt;
}

export const verifyAccessToken = async (token: string) => {
    const JWT_SECRET = getEnv("JWT_SECRET");

    const secret = new TextEncoder().encode(JWT_SECRET)
    const {payload} = await jose.jwtVerify(token, secret);

    return payload;
}

export const verifyRefreshToken = async (token: string) => {
    const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");

    const secret = new TextEncoder().encode(JWT_REFRESH_SECRET)
    const {payload} = await jose.jwtVerify(token, secret);

    return payload;
}