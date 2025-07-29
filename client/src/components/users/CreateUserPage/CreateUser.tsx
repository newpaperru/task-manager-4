import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UsersService } from "@api/users.service";
import { Header } from "@components/widgets/HeaderLayout/Header";
import { Navigation } from "@components/widgets/NavigationLayout/Navigation";
import { userCreateSchema, type UserCreateFormData } from "../UserForm.types";
import styles from "../users.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { UserFormFields } from "@components/widgets/UserFormFieldsLayout/UserFormFields";

export const CreateUser = () => {
    const navigate = useNavigate();
    const methods = useForm<UserCreateFormData>({
        resolver: zodResolver(userCreateSchema),
    });

    const [name, surName] = methods.watch(["name", "surName"]);

    useEffect(() => {
        methods.setValue("fullName", `${name || ""} ${surName || ""}`.trim(), {
            shouldValidate: true,
        });
    }, [name, surName, methods]);

    const onSubmit = async (data: UserCreateFormData) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { confirmPassword, ...userData } = data;
            await UsersService.create(userData);
            methods.reset();
            navigate("/");
        } catch (error) {
            console.error("Ошибка создания пользователя:", error);
        }
    };

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
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className={styles.form}
                    >
                        <h2 className={styles.title}>
                            Создание нового пользователя
                        </h2>
                        <UserFormFields isEdit={false} />
                        <button type="submit" className={styles.submit_button}>
                            Создать пользователя
                        </button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};
