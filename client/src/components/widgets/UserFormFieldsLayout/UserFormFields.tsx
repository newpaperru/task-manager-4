import { useFormContext } from "react-hook-form";
import styles from "@components/users/users.module.css";

const employmentOptions = [
    "Полная занятость",
    "Частичная занятость",
    "Фриланс",
    "Безработный",
];

export const UserFormFields = ({ isEdit = false }: { isEdit?: boolean }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            {/* Имя */}
            <div className={styles.form_group}>
                <label htmlFor="name">Имя*</label>
                <input {...register("name")} id="name" />
                {errors.name && (
                    <span className={styles.error}>
                        {errors.name.message as string}
                    </span>
                )}
            </div>

            {/* Фамилия */}
            <div className={styles.form_group}>
                <label htmlFor="surName">Фамилия*</label>
                <input {...register("surName")} id="surName" />
                {errors.surName && (
                    <span className={styles.error}>
                        {errors.surName.message as string}
                    </span>
                )}
            </div>

            {/* Полное имя */}
            <div className={styles.form_group}>
                <label htmlFor="fullName">Полное имя*</label>
                <input {...register("fullName")} id="fullName" />
                {errors.fullName && (
                    <span className={styles.error}>
                        {errors.fullName.message as string}
                    </span>
                )}
            </div>

            {isEdit ? (
                <div className={styles.form_group}>
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="text"
                        value="••••••••"
                        readOnly
                        className={styles.readonly}
                        id="password"
                    />
                </div>
            ) : (
                <>
                    <div className={styles.form_group}>
                        <label htmlFor="email">Email*</label>
                        <input type="email" {...register("email")} id="email" />
                        {errors.email && (
                            <span className={styles.error}>
                                {errors.email.message as string}
                            </span>
                        )}
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="password">Пароль*</label>
                        <input
                            type="password"
                            {...register("password")}
                            id="password"
                        />
                        {errors.password && (
                            <span className={styles.error}>
                                {errors.password.message as string}
                            </span>
                        )}
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="confirmPassword">
                            Подтвердите пароль*
                        </label>
                        <input
                            type="password"
                            {...register("confirmPassword")}
                            id="confirmPassword"
                        />
                        {errors.confirmPassword && (
                            <span className={styles.error}>
                                {errors.confirmPassword.message as string}
                            </span>
                        )}
                    </div>
                </>
            )}

            {/* Дата рождения */}
            <div className={styles.form_group}>
                <label htmlFor="birthDate">Дата рождения</label>
                <input type="date" {...register("birthDate")} id="birthDate" />
                {errors.birthDate && (
                    <span className={styles.error}>
                        {errors.birthDate.message as string}
                    </span>
                )}
            </div>

            {/* Телефон */}
            <div className={styles.form_group}>
                <label htmlFor="telephone">Телефон</label>
                <input
                    {...register("telephone")}
                    placeholder="+79991234567"
                    id="telephone"
                />
                {errors.telephone && (
                    <span className={styles.error}>
                        {errors.telephone.message as string}
                    </span>
                )}
            </div>

            {/* Занятость */}
            <div className={styles.form_group}>
                <label htmlFor="employment">Занятость</label>
                <select {...register("employment")} id="employment">
                    <option value="" className={styles.option}>
                        Не выбрано
                    </option>
                    {employmentOptions.map((option) => (
                        <option
                            key={option}
                            value={option}
                            className={styles.option}
                        >
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            {/* Соглашение */}
            <div className={styles.form_group}>
                <label htmlFor="userAgreement">
                    <input
                        type="checkbox"
                        {...register("userAgreement")}
                        id="userAgreement"
                        className={styles.user_agreement_checkbox_input}
                    />
                    <span>Примите пользовательское соглашение</span>
                </label>
            </div>
        </>
    );
};
