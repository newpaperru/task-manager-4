import styles from "@LoginForm/LoginForm.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AuthService } from "@api/auth.service";
import { useNavigate } from "react-router-dom";
import CloseEyeIcon from "@assets/icons/closeEye.svg?react";
import OpenEyeIcon from "@assets/icons/openEye.svg?react";
import type { AxiosError } from "axios";

type FormData = {
    email: string;
    password: string;
};

export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setError(null);
        setIsLoading(true);

        try {
            await AuthService.login(data.email, data.password);
            navigate("/");
        } catch (err) {
            const error = err as AxiosError;

            if (error.response?.status === 401) {
                setError("Неверный email или пароль");
                
            } else {
                setError(
                    error.message || "Ошибка при входе. Попробуйте позже."
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.login}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.form}>
                <h1 className={styles.title}>Войти в аккаунт</h1>

                {error && <div className={styles.error_message}>{error}</div>}

                <label htmlFor="email" className={styles.subtitle}>
                    Email
                </label>
                <input
                    type="email"
                    placeholder="Введите email"
                    id="email"
                    className={styles.input}
                    {...register("email", {
                        required: "Email обязателен",
                    })}
                />
                {errors.email && (
                    <span className={styles.error}>{errors.email.message}</span>
                )}

                <label htmlFor="password" className={styles.subtitle}>
                    Пароль
                </label>
                <div className={styles.container}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Введите пароль"
                        id="password"
                        className={styles.input}
                        {...register("password", {
                            required: "Пароль обязателен",
                        })}
                    />
                    <button
                        type="button"
                        className={styles.show_password}
                        onClick={togglePasswordVisibility}
                        aria-label={
                            showPassword ? "Скрыть пароль" : "Показать пароль"
                        }
                    >
                        {showPassword ? <CloseEyeIcon /> : <OpenEyeIcon />}
                    </button>
                </div>
                {errors.password && (
                    <span className={styles.error}>
                        {errors.password.message}
                    </span>
                )}

                <button
                    type="submit"
                    className={styles.button_login}
                    disabled={isLoading}
                >
                    {isLoading ? "Вход..." : "Войти"}
                </button>
            </form>
        </div>
    );
};
