// interface Пользователя
export interface User {
    id: string;
    name: string;
    surName: string;
    email: string;
    fullName: string;
    telephone?: string;
    birthDate?: string;
    employment?: string;
    userAgreement?: boolean;
    password?: string;
}

// Для создания пользователя
export type UserCreateRequest = Omit<User, "id">;

// Ответ при создании пользователя
export interface UserCreateResponse {
    id: string;
    name: string;
}
