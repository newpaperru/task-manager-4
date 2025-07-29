import styles from "./Navigation.module.css";

import UserCreateIcon from "@assets/icons/userCreate.svg?react";
import LogOutIcon from "@assets/icons/logout.svg?react";

import { useNavigate } from "react-router-dom";
import { AuthService } from "@api/auth.service";

export const Navigation = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            navigate("/login");
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        }
    };


    const handleCreateUser = () => {
        navigate("/user/create");
    };

    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <UserCreateIcon
                        onClick={handleCreateUser}
                        aria-label="Создать пользователя"
                    />
                </li>
                <li className={styles.item}>
                    <LogOutIcon
                        onClick={handleLogout}
                        aria-label="Выйти из аккаунта"
                    />
                </li>
            </ul>
        </nav>
    );
};
