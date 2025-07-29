import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();

    const handleTitleClick = () => {
        navigate("/");
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <button
                        className={styles.title}
                        onClick={handleTitleClick}
                        style={{ cursor: "pointer" }}
                    >
                        Админ панель
                    </button>
                </div>
            </div>
        </header>
    );
};
