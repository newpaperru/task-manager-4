import { Header } from "@widgets/HeaderLayout/Header";
import styles from "./Home.module.css";
import { Navigation } from "@widgets/NavigationLayout/Navigation";
import { Table } from "@components/Home/Home__element/Table";
import { useEffect, useState } from "react";
import { UsersService } from "@api/users.service";
import type { User } from "@components/Home/types";
import { AuthService } from "@api/auth.service";

export const Home = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Проверяем авторизацию перед запросом
                await AuthService.getMe();
                const data = await UsersService.getAll();
                setUsers(data);
            } catch (err) {
                setError((err as Error).message);
                console.error("Ошибка загрузки пользователей:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div className={styles.home}>
            <Header />
            <Navigation />
            <div className={styles.content}>
                <Table users={users} />
            </div>
        </div>
    );
};
