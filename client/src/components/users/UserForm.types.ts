import { z } from "zod";

export const userBaseSchema = {
    name: z
        .string()
        .min(1, "Имя обязательно")
        .max(64, "Максимальная длина 64 символа"),
    surName: z
        .string()
        .min(1, "Фамилия обязательна")
        .max(64, "Максимальная длина 64 символа"),
    fullName: z
        .string()
        .min(1, "Полное имя обязательно")
        .max(130, "Максимальная длина 130 символов"),
    birthDate: z
        .string()
        .optional()
        .refine((val) => !val || !isNaN(new Date(val).getTime()), {
            message: "Некорректная дата",
        })
        .transform((val) => (val ? new Date(val).toISOString() : undefined)),
    telephone: z
        .string()
        .regex(/^$|^\+?[0-9]{10,15}$/, "Некорректный формат телефона")
        .optional()
        .transform((val) => (val === "" ? undefined : val)),
    employment: z.string().optional(),
    userAgreement: z.boolean().optional(),
};

export const userCreateSchema = z
    .object({
        ...userBaseSchema,
        password: z
            .string()
            .min(1, "Пароль обязателен")
            .min(6, "Пароль должен содержать минимум 6 символов"),
        confirmPassword: z.string().min(1, "Повторите пароль"),
        email: z
            .string()
            .min(1, "Email обязателен")
            .email("Некорректный email"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Пароли не совпадают",
        path: ["confirmPassword"],
    });

export const userEditSchema = z.object(userBaseSchema);

export type UserBaseFormData = {
    name: string;
    surName: string;
    fullName: string;
    birthDate?: string;
    telephone?: string;
    employment?: string;
    userAgreement?: boolean;
    email?: string;
};
export type UserCreateFormData = {
  name: string;
  surName: string;
  fullName: string;
  birthDate?: string;
  telephone?: string;
  employment?: string;
  userAgreement?: boolean;
  password: string;
  confirmPassword: string;
  email: string;
};
