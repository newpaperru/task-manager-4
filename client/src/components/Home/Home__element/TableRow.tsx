import styles from "./Table.module.css";
import type { User } from "@components/Home/types";
import { UsersService } from "@api/users.service";
import { useNavigate } from "react-router-dom";

import UserDeleteIcon from "@assets/icons/userDelete.svg?react";
import UserEditIcon from "@assets/icons/userEdit.svg?react";

type TableRowProps = {
    user: User;
    onUserDeleted?: (id: string) => void;
};

export const TableRow = ({ user, onUserDeleted }: TableRowProps) => {
    const shortId = user.id.substring(0, 8);
    const navigate = useNavigate();

    const formatDate = (date?: string) => {
        if (!date) return "Не указана";
        try {
            return new Date(date).toLocaleDateString();
        } catch {
            return "Некорректная дата";
        }
    };

    const handleDelete = async () => {
        const isConfirmed = window.confirm(
            `Вы уверены, что хотите удалить пользователя ${user.name}?`
        );

        if (isConfirmed) {
            try {
                await UsersService.delete(user.id);
                alert("Пользователь успешно удален");
                onUserDeleted?.(user.id);
            } catch (error) {
                alert("Произошла ошибка при удалении пользователя");
                console.error("Delete error:", error);
            }
        }
    };

    // Обработчик клика по иконке редактирования
    const handleEdit = () => {
        navigate(`/user/edit/${user.id}`); // Перенаправляем на страницу редактирования
    };

    return (
        <>
            <div className={styles.cell} title={user.id}>
                {shortId}
            </div>
            <div className={styles.cell}>{user.name}</div>
            <div className={styles.cell}>{user.surName || "-"}</div>
            <div className={styles.cell}>{user.fullName || "-"}</div>
            <div className={styles.cell}>{formatDate(user.birthDate)}</div>
            <div className={styles.cell}>{user.email}</div>
            <div className={styles.cell}>{user.telephone || "-"}</div>
            <div className={styles.cell}>{user.employment || "Не указана"}</div>
            <div className={styles.cell}>
                {user.userAgreement
                    ? "✓"
                    : user.userAgreement === false
                    ? "✗"
                    : "—"}
            </div>
            <div className={styles.actions}>
                <UserEditIcon
                    onClick={handleEdit}
                    style={{ cursor: "pointer" }} 
                />
                <UserDeleteIcon
                    onClick={handleDelete}
                    style={{ cursor: "pointer" }}
                />
            </div>
        </>
    );
};
