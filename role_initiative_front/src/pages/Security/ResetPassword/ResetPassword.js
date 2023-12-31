import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePassword } from '../../../apis/security';
import style from "./ResetPassword.module.scss";

export default function ResetPassword() {
    const email = window.location.search.split("=")[1];
    const [feedBack, setFeedback] = useState();
    const navigate = useNavigate();

    const defaultValues = {
        password: "",
        confirmPassword: "",
    };

    const validationSchema = yup.object({
        password: yup
            .string()
            .required("Champ obligatoire")
            .min(8, "8 à 30 caractères attendus")
            .max(30, "8 à 30 caractères attendus")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#~_$^*%&;§=+ÈÉ/\-\\])/, "Exemple valide : D&Dr4g0ns"),
        confirmPassword: yup
            .string()
            .required("Champ obligatoire")
            .oneOf(
                [yup.ref("password")], "Les mots de passe doivent être identiques"
            ),
    });

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        setError,
        clearErrors,
    } = useForm({
        defaultValues,
        mode: "onBlur",
        resolver: yupResolver(validationSchema),
    });

    const submit = async (values) => {
        try {
            clearErrors();
            const response = await changePassword(values.password, email);
            if (response.message) {
                setFeedback(response.message);
                setTimeout(() => {
                    navigate("../login-register");
                }, 2000);
            }
        } catch (error) {
            setFeedback(null)
            setError("generic", { type: "generic", message: error });
        }
    };

    return (
        <main>
            <form onSubmit={handleSubmit(submit)} className={`page-width center-horizontal ${style.reset_form}`}>
                <h2>Réinitialisation de mot de passe :</h2>

                <label className="input-text" htmlFor="password">
                    <input id="password" name="password" type="password" placeholder="" {...register("password")} />
                    <span>Mot de passe</span>
                    {errors.password && <p className="form-error">{errors.password.message}</p>}
                </label>

                <label className="input-text" htmlFor="confirmPassword">
                    <input id="confirmPassword" name="confirmPassword" type="password" placeholder="" {...register("confirmPassword")} />
                    <span>Confirmer le mot de passe</span>
                    {errors.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
                </label>

                {errors.generic && <p className="form-error">{errors.generic.message}</p>}

                <button disabled={isSubmitting} className="btn btn-phantom">
                    Modifier
                </button>

                {feedBack && <p className="form-error">{feedBack}</p>}
            </form>
        </main>
    );
}
