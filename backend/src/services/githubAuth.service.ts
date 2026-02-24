import * as Arctic from "arctic";
import { getEnv } from "../config/env.config.js";

interface UserInfo {
    sub: string, 
    email: string, 
    name: string,
    picture: URL
}

class GithubService {
    private github: Arctic.GitHub;

    constructor(clientId: string, clientSecret: string, redirectUrl: string) {
        this.github = new Arctic.GitHub(clientId, clientSecret, redirectUrl);
    }

    getAuthorizationUrl(): URL {
        const state = Arctic.generateState();
        const scope = ["user:email"];
        
        const authUrl = this.github.createAuthorizationURL(state, scope);
        return authUrl;
    }

    async exchangeCode(code: string): Promise<string> {
        const tokens = await this.github.validateAuthorizationCode(code);
        const idToken = tokens.idToken();
        return idToken;
    }

    getUserInfo(idToken: string): UserInfo {
        const userInfo = Arctic.decodeIdToken(idToken);
        return userInfo as UserInfo;
    }
}

const GITHUB_CLIENT_ID = getEnv("GITHUB_ID");
const GITHUB_CLIENT_SECRET = getEnv("GITHUB_SECRET");
const GITHUB_REDIRECT_URL = getEnv("GITHUB_REDIRECT_URL");

export const githubAuth = new GithubService(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_REDIRECT_URL);