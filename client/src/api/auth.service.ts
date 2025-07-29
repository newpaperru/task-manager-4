import axios from "axios";

const API_URL = "http://localhost:4000/api/v1/auth";

// Тип для стандартного ответа с ошибкой от API
interface ApiError {
    message: string;
    statusCode?: number;
}

export const AuthService = {
    async login(email: string, password: string) {
        try {
            const response = await axios.post(
                `${API_URL}/login`,
                { email, password },
                {
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    async logout() {
        try {
            const response = await axios.post(
                `${API_URL}/logout`,
                {},
                {
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    async getMe() {
        try {
            const response = await axios.get(`${API_URL}/me`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    // Общий обработчик ошибок
    handleError(error: unknown): ApiError {
        // Ошибка Axios
        if (axios.isAxiosError(error)) {
            return {
                message: error.response?.data?.message || error.message,
                statusCode: error.response?.status,
            };
        }

        // Стандартная ошибка Error
        if (error instanceof Error) {
            return { message: error.message };
        }

        return { message: "Неизвестная ошибка" };
    },
};
