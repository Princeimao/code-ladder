import apiClient from "./axios";

const googleAuth = {
    async register() {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/google`;
    },
    async login() {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/google`;
    },
};

const githubAuth = {
    async register() {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/github`;
    },
    async login() {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/github`;
    },
};

const refreshToken = async () => {
    try {
        await apiClient.get("/auth/refresh");
        return;
    } catch (error) {
        console.error("Error refreshing token:", error);
        throw error;
    }
}

const logout = async () => {
    try {
        const response = await apiClient.get("/auth/logout");
        return response.data;
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
}

const getUser = async () => {
    try {
        const response = await apiClient.get("/auth/me");
        return response.data;
    } catch (error) {
        console.error("Error getting user:", error);
        throw error;
    }
}

export { googleAuth, githubAuth, logout, refreshToken, getUser };