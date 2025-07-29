import styles from "./Table.module.css";
import { TableRow } from "./TableRow";
import type { User } from "@components/Home/types";
import { useState } from "react";

type TableProps = {
    users: User[];
};

export const Table = ({ users: initialUsers }: TableProps) => {
    const [users, setUsers] = useState(initialUsers);

    const handleUserDeleted = (deletedUserId: string) => {
        setUsers(users.filter((user) => user.id !== deletedUserId));
    };

    return (
        <div className={styles.table}>
            <div className={styles.cell}>ID</div>
            <div className={styles.cell}>Имя</div>
            <div className={styles.cell}>Фамилия</div>
            <div className={styles.cell}>Полное имя</div>
            <div className={styles.cell}>Дата рождения</div>
            <div className={styles.cell}>Email</div>
            <div className={styles.cell}>Телефон</div>
            <div className={styles.cell}>Занятость</div>
            <div className={styles.cell}>Соглашение</div>
            <div className={styles.cell}>Действия</div>

            {users.map((user) => (
                <TableRow
                    key={user.id}
                    user={user}
                    onUserDeleted={handleUserDeleted}
                />
            ))}
        </div>
    );
};
