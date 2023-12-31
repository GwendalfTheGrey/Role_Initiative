import { useContext, useState } from "react";
import { LevelsContext } from "../../../context/LevelsContext";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import style from "./Register.module.scss";
import { createUser } from "../../../apis/users";


export default function Register({ adminSigningScreen = false, setAdminPresent }) {
    const levels = useContext(LevelsContext);

    const [feedBack, setFeedBack] = useState();

    const defaultValues = {
        username: "",
        emailRegister: "",
        passwordRegister: "",
        confirmPassword: "",
        idLevel: "",
        GM: false,
        privacyPolicy: false,
        TOS: false,
    };

    const validationSchema = yup.object({
        username: yup
            .string()
            .required("Champ obligatoire")
            .min(2, "Minimum 2 caractères"),
        emailRegister: yup
            .string()
            .required("Champ obligatoire")
            .email("Email non valide")
            .matches(
                /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                "Email non valide"
            ),
        passwordRegister: yup
            .string()
            .required("Champ obligatoire")
            .min(8, "8 à 30 caractères attendus")
            .max(30, "8 à 30 caractères attendus")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#~_$^*%&;§=+ÈÉ/\-\\])/, "Exemple valide : D&Dr4g0ns"),
        confirmPassword: yup
            .string()
            .required("Champ obligatoire")
            .oneOf(
                [yup.ref("passwordRegister")], "Les mots de passe doivent être identiques"
            ),
        idLevel: yup
            .string()
            .required("Votre niveau est nécessaire"),
        GM: yup
            .bool(),
        privacyPolicy: yup
            .bool().oneOf([true], "Merci d'accepter les politiques"),
        TOS: yup
            .bool().oneOf([true], "Merci d'accepter les conditions générales"),
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
            const response = await createUser({ ...values, admin: adminSigningScreen, emailRegister: values.emailRegister.toLowerCase() });
            if (response.message) {
                reset();
                setFeedBack(response.message);
                adminSigningScreen && setAdminPresent(true);
            }
        } catch (error) {
            setFeedBack(null);
            setError("generic", { type: "generic", message: error });
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className={`${style.register_form}`}>
            <label className="input-text" htmlFor="username">
                <input id="username" name="username" type="text" placeholder="" {...register("username")} />
                <span>Nom d'utilisateur</span>
                {errors.username && <p className="form-error">{errors.username.message}</p>}
            </label>

            <label className="input-text" htmlFor="emailRegister">
                <input id="emailRegister" name="emailRegister" type="email" placeholder="" {...register("emailRegister")} />
                <span>Email</span>
                {errors.emailRegister && <p className="form-error">{errors.emailRegister.message}</p>}
            </label>

            <label className="input-text" htmlFor="passwordRegister">
                <input id="passwordRegister" name="passwordRegister" type="password" placeholder="" {...register("passwordRegister")} />
                <span>Mot de passe</span>
                {errors.passwordRegister && <p className="form-error">{errors.passwordRegister.message}</p>}
            </label>

            <label className="input-text" htmlFor="confirmPassword">
                <input id="confirmPassword" name="confirmPassword" type="password" placeholder="" {...register("confirmPassword")} />
                <span>Confirmer le mot de passe</span>
                {errors.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
            </label>

            <div className={`${style.register_form_user_type}`}>
                <div className={`${style.register_form_user_type_player}`}>
                    <p>Niveau de joueur : </p>
                    <div className={`${style.register_form_user_type_player_levels}`}>
                        {
                            levels?.map((level) => (
                                <label key={level.idLevel} htmlFor={level.idLevel}>
                                    <input id={level.idLevel} name="idLevel" type="radio" value={level.idLevel} {...register("idLevel")} />
                                    <span>{level.levelName}</span>
                                </label>
                            ))
                        }
                        {errors.idLevel && <p className="form-error">{errors.idLevel.message}</p>}
                    </div>
                </div>

                <div className={`${style.register_form_user_type_gm}`}>
                    <p>Vous voulez créer vos salons et donner vie à vos aventures ? Devenez : </p>
                    <label className="generic-checkbox" htmlFor="GM">
                        <input id="GM" name="GM" type="checkbox" {...register("GM")} />
                        <span>Maître du jeu</span>
                    </label>
                </div>
            </div>

            <label className="generic-checkbox" htmlFor="privacyPolicy">
                <input id="privacyPolicy" name="privacyPolicy" type="checkbox" {...register("privacyPolicy")} />
                <Link to={"../privacy-policy"}>Politique de confidentialité</Link>
                {errors.privacyPolicy && <p className="form-error">{errors.privacyPolicy.message}</p>}
            </label>

            <label className="generic-checkbox" htmlFor="TOS">
                <input id="TOS" name="TOS" type="checkbox" {...register("TOS")} />
                <Link to={"../terms-of-service"}>Conditions Générales d'Utilisation (CGU)</Link>
                {errors.TOS && <p className="form-error">{errors.TOS.message}</p>}
            </label>
            {errors.generic && <p className="form-error">{errors.generic.message}</p>}

            <button disabled={isSubmitting} className="btn btn-phantom">
                S'inscrire
            </button>

            {feedBack && <p className="form-error">{feedBack}</p>}
        </form>
    );
}
