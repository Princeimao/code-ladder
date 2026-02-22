import axios from "axios";
import { refreshToken } from "./auth.api";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const apiClient = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const origionalRequest = error.config;
    origionalRequest._retry = true;
    
    if (error.response?.status === 401 && !origionalRequest._retry) {
        await refreshToken();
        return apiClient(origionalRequest);
    }
    return Promise.reject(error);
  }
);


export default apiClient;