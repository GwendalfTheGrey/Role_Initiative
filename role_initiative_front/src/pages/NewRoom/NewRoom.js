import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LevelsContext } from "../../context/LevelsContext";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import style from "./NewRoom.module.scss";
import { TTRPGContext } from "../../context/TTRPGContext";
import { createRoom } from "../../apis/rooms";

export default function NewRoom() {
    const { user } = useContext(AuthContext);

    const levels = useContext(LevelsContext);

    const TTRPG = useContext(TTRPGContext);

    const navigate = useNavigate();

    const defaultValues = {
        title: "",
        description: "",
        discord: "",
        idLevel: "",
        idTTRPG: "",
    };

    const validationSchema = yup.object({
        title: yup
            .string()
            .required("Champ obligatoire")
            .min(10, "Il faut un nom de quête d'au moins 10 caractères")
            .max(60, "Un nom de quête d'accord mais il y a des limites"),
        description: yup
            .string()
            .required("Champ obligatoire")
            .min(100, "Une introduction serait de bon ton, 100 caractères minimum c'est peu"),
        discord: yup
            .string(),
        idLevel: yup
        .string()
        .required("Un niveau minimum est attendu"),
        idTTRPG: yup
        .string()
        .required("Il faut choisir un jeu"),
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
            console.log(values);
            clearErrors();
            const response = await createRoom({...values, idUser: user.idUser, onGoing: false})
            reset();
            navigate(window.location.pathname.split("/")[1] === "new-room" ? `../room/${response.idRoom}/${response.title}` : `../../room/${response.idRoom}/${response.title}`);
        } catch (error) {
            setError("generic", { type: "generic", message: error });
        }
    };

    return (
        <main>
            <section className={`page-width center-horizontal ${style.new_room}`}>
                <h2>Création de salon :</h2>
                <form onSubmit={handleSubmit(submit)} className={`${style.new_room_form}`}>
                    <label className="input-text" htmlFor="title">
                        <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder=""
                        required
                        {...register("title")}
                        />
                        <span>Titre</span>
                        {errors.title && <p className="form-error">{errors.title.message}</p>}
                    </label>

                    <label className="input-text" htmlFor="description">
                        <textarea
                        id="description"
                        name="description"
                        maxLength="600"
                        rows="8" required
                        {...register("description")}
                        />
                        <span>Préambule</span>
                        {errors.description && <p className="form-error">{errors.description.message}</p>}
                    </label>

                    <label className="input-text" htmlFor="discord">
                        <input
                        id="discord"
                        name="discord"
                        type="text"
                        placeholder=""
                        {...register("discord")}
                        />
                        <span>Lien Discord</span>
                        {errors.discord && <p className="form-error">{errors.discord.message}</p>}
                    </label>

                    <div className={`${style.new_room_form_room}`}>
                        <p>Niveau minimum attendu : </p>
                        <div className={`${style.new_room_form_room_levels_ttrpg}`}>
                            {
                                levels?.map((level) => (
                                    <label key={level.idLevel} htmlFor={`level-${level.idLevel}`}>
                                        <input
                                        id={`level-${level.idLevel}`}
                                        name="idLevel"
                                        type="radio"
                                        value={level.idLevel}
                                        required
                                        {...register("idLevel")}
                                        />
                                        <span>{level.levelName}</span>
                                    </label>
                                ))
                            }
                            {errors.idLevel && <p className="form-error">{errors.idLevel.message}</p>}
                        </div>
                        <p>Jeu de rôle : </p>
                        <div className={`${style.new_room_form_room_levels_ttrpg}`}>
                            {
                                TTRPG?.map((ttrpg) => (
                                    <label key={ttrpg.idTTRPG} htmlFor={`ttrpg-${ttrpg.idTTRPG}`}>
                                        <input
                                        id={`ttrpg-${ttrpg.idTTRPG}`}
                                        name="idTTRPG"
                                        type="radio"
                                        value={ttrpg.idTTRPG}
                                        required
                                        {...register("idTTRPG")}
                                        />
                                        <span>{ttrpg.TTRPGName}</span>
                                    </label>
                                ))
                            }
                            {errors.idTTRPG && <p className="form-error">{errors.idTTRPG.message}</p>}
                        </div>
                    </div>

                    {errors.generic && (
                        <p className="form-error">{errors.generic.message}</p>
                    )}

                    <button disabled={isSubmitting} className="btn btn-phantom">
                        Créer salon
                    </button>
                </form>
            </section>
        </main>
    );
}
