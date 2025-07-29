import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { UsersService } from "@api/users.service";
import { Header } from "@components/widgets/HeaderLayout/Header";
import { Navigation } from "@components/widgets/NavigationLayout/Navigation";
import { userEditSchema, type UserBaseFormData } from "../UserForm.types";
import styles from "../users.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormFields } from "@components/widgets/UserFormFieldsLayout/UserFormFields";

export const EditUser = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<{
        id: string;
        email: string;
        password: string;
    } | null>(null);

    const methods = useForm<UserBaseFormData>({
        resolver: zodResolver(userEditSchema),
    });

    const { reset, setValue, watch, handleSubmit } = methods;

    const [name, surName] = watch(["name", "surName"]);

    useEffect(() => {
        const loadUserData = async () => {
            if (!id) return;

            try {
                const users = await UsersService.getAll();
                const user = users.find((u) => u.id === id);

                if (user) {
                    setUserData({
                        id: user.id,
                        email: user.email,
                        password: "••••••••"
                    });

                    reset({
                        name: user.name,
                        surName: user.surName,
                        fullName:
                            user.fullName || `${user.name} ${user.surName}`,
                        birthDate: user.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : undefined,
                        telephone: user.telephone,
                        employment: user.employment,
                        userAgreement: user.userAgreement,
                    });
                }
            } catch (error) {
                console.error("Ошибка загрузки данных пользователя:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadUserData();
    }, [id, reset]);

    useEffect(() => {
        setValue("fullName", `${name || ""} ${surName || ""}`.trim(), {
            shouldValidate: true,
        });
    }, [name, surName, setValue]);

    const onSubmit = async (data: UserBaseFormData) => {
        if (!id) return;

        try {
            await UsersService.update(id, data);
            navigate("/");
        } catch (error) {
            console.error("Ошибка обновления пользователя:", error);
        }
    };

    if (isLoading) return <div>Загрузка...</div>;
    if (!userData) return <div>Пользователь не найден</div>;

    return (
        <div className={styles.container}>
            <div className={`${styles.circle} ${styles.grad_one}`}></div>
            <div className={`${styles.circle} ${styles.grad_two}`}></div>
            <div className={`${styles.circle} ${styles.grad_three}`}></div>

            <Header />
            <Navigation />

            <div className={styles.form_container}>
                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={styles.form}
                    >
                        <h2 className={styles.title}>
                            Редактирование пользователя
                        </h2>

                        <div className={styles.form_group}>
                            <label htmlFor="id">ID</label>
                            <input
                                value={userData.id}
                                readOnly
                                className={styles.readonly}
                                id="id"
                            />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="email">Email</label>
                            <input
                                value={userData.email}
                                readOnly
                                className={styles.readonly}
                                id="email"
                            />
                        </div>

                        <UserFormFields isEdit />

                        <div className={styles.buttons}>
                            <button
                                type="submit"
                                className={styles.submit_button}
                            >
                                Сохранить изменения
                            </button>
                            <button
                                type="button"
                                className={styles.cancel_button}
                                onClick={() => navigate("/")}
                            >
                                Отмена
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};
