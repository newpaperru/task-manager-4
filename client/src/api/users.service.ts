// api/users.service.ts
import axios from "axios";
import type {
    User,
    UserCreateRequest,
    UserCreateResponse,
} from "@components/Home/types";

const API_URL = "http://localhost:4000/api/v1/users";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const UsersService = {
    async getAll(): Promise<User[]> {
        const response = await api.get("/");
        return response.data;
    },

    async create(userData: UserCreateRequest): Promise<UserCreateResponse> {
        const response = await api.post("/", userData);
        return response.data;
    },

    async update(
        id: string,
        userData: Partial<UserCreateRequest>
    ): Promise<User> {
        const response = await api.patch(`/${id}`, userData);
        return response.data;
    },

    async delete(id: string): Promise<void> {
        await api.delete(`/${id}`);
    },
};
