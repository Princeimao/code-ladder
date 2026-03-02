import apiClient from "./axios";

export const getQuestion = {
    async get(page: string, limit: string) {
        const response = await apiClient.get("/question/get-questions", {
            params: {
                page,
                limit
            }
        });
        return response.data;
    },
    async getQuestionById(questionId: string) {
        const response = await apiClient.get(`/question/${questionId}`);
        return response.data;
    }
}