import * as Arctic from "arctic";
import { getEnv } from "../config/env.config.js";

interface UserInfo {
    sub: string, 
    email: string, 
    name: string,
    picture: URL
}

class GoogleService {
    private google: Arctic.Google;

    constructor(clientId: string, clientSecret: string, redirectUrl: string) {
        this.google = new Arctic.Google(clientId, clientSecret, redirectUrl)
    }

    getAuthorizationUrl (): {authUrl: URL, codeVerifier: string, state: string} {
        const codeVerifier = Arctic.generateCodeVerifier();
        const state = Arctic.generateState();
        const scope = ["openid", "email", "profile"];
        
        const authUrl = this.google.createAuthorizationURL(state, codeVerifier, scope);
        return {authUrl, codeVerifier, state};
    }

    async exchangeCode(code: string, codeVerifier: string): Promise<string> {
        const tokens = await this.google.validateAuthorizationCode(code, codeVerifier);
        const idToken = tokens.idToken();
        return idToken;
    }

    getUserInfo(idToken: string): UserInfo {
        const userInfo = Arctic.decodeIdToken(idToken);
        return userInfo as UserInfo;
    }
}

const GOOGLE_CLIENT_ID = getEnv(process.env.GOOGLE_CLIENT_ID!);
const GOOGLE_CLIENT_SECRET = getEnv(process.env.GOOGLE_CLIENT_SECRET!);
const GOOGLE_REDIRECT_URL = getEnv(process.env.GOOGLE_REDIRECT_URL!);

export const googleAuth = new GoogleService(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL);