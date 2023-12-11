import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import style from "./Login.module.scss";

export default function Login({ adminSigningScreen = false }) {
    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const defaultValues = {
        emailLogin: "",
        passwordLogin: "",
        stayConnected: false,
    };

    const validationSchema = yup.object({
        emailLogin: yup
            .string()
            .required("Champ obligatoire")
            .email("Email non valide")
            .matches(
                /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                "Email non valide"
            ),
        passwordLogin: yup
            .string()
            .required("Champ obligatoire")
            .min(8, "8 à 30 caractères attendus")
            .max(30, "8 à 30 caractères attendus")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#~_$^*%&;§=+ÈÉ/\-\\])/, "Exemple valide : D&Dr4g0ns"),
        stayConnected: yup
            .bool()
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
        resolver: yupResolver(validationSchema),
    });

    const submit = async (values) => {
        try {
            clearErrors();
            await login({ ...values, admin: adminSigningScreen, emailLogin: values.emailLogin.toLowerCase() });
            reset();
            navigate("/");
        } catch (error) {
            setError("generic", { type: "generic", message: error });
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className={`${style.login_form}`}>
            <label className="input-text" htmlFor="emailLogin">
                <input id="emailLogin" name="emailLogin" type="email" placeholder="" required {...register("emailLogin")} />
                <span>Email</span>
                {errors.emailLogin && <p className="form-error">{errors.emailLogin.message}</p>}
            </label>

            <label className="input-text" htmlFor="passwordLogin">
                <input id="passwordLogin" name="passwordLogin" type="password" placeholder="" required {...register("passwordLogin")} />
                <span>Mot de passe</span>
                {errors.passwordLogin && <p className="form-error">{errors.passwordLogin.message}</p>}
            </label>

            <div className={`${style.login_form_add_ons}`}>
                <label className="generic-checkbox" htmlFor="stayConnected">
                    <input id="stayConnected" name="stayConnected" type="checkbox" {...register("stayConnected")} />
                    <span>Rester connecté <span>(1 mois)</span></span>
                </label>
                <Link>Mot de passe oublié ?</Link>
            </div>

            {errors.generic && (
                <p className="form-error">{errors.generic.message}</p>
            )}

            <button disabled={isSubmitting} className="btn btn_phantom">
                Se connecter
            </button>
        </form>
    );
}
