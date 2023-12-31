import { useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from '../../../apis/security';
import style from "./ForgottenPassword.module.scss";

export default function ForgottenPassword() {
    const [feedBack, setFeedback] = useState();

    const defaultValues = {
        email: "",
    };

    const validationSchema = yup.object({
        email: yup
            .string()
            .required("Champ obligatoire")
            .email("Email non valide")
            .matches(
                /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                "Email non valide"
            ),
    });

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        setError,
        clearErrors,
        reset
    } = useForm({
        defaultValues,
        mode: "onBlur",
        resolver: yupResolver(validationSchema),
    });

    const submit = async (values) => {
        try {
            clearErrors();
            const response = await resetPassword(values.email);
            if (response.message) {
                setFeedback(response.message);
                reset();
            }
        } catch (error) {
            setFeedback(null)
            setError("generic", { type: "generic", message: error });
        }
    };

    return (
        <main>
            <form onSubmit={handleSubmit(submit)} className={`page-width center-horizontal ${style.forgotten_form}`}>
                <h2>Mot de passe oublié :</h2>

                <label className="input-text" htmlFor="email">
                    <input id="email" name="email" type="email" placeholder="" {...register("email")} />
                    <span>Email</span>
                    {errors.email && <p className="form-error">{errors.email.message}</p>}
                </label>

                {errors.generic && <p className="form-error">{errors.generic.message}</p>}

                <button disabled={isSubmitting} className="btn btn-phantom">
                    Envoyer un lien
                </button>

                {feedBack && <p className="form-error">{feedBack}</p>}
            </form>
        </main>
    );
}
