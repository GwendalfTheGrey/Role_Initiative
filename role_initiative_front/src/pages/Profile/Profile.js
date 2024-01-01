import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactComponent as UserBody } from "../../assets/images/user-silhouette.svg";
import { ReactComponent as UserDice } from "../../assets/images/user-dice.svg";
import style from "./Profile.module.scss";
import { useFetchProfileAllRooms } from "../../hooks/useFetchProfileAllRooms";
import { useFetchProfileGM } from "../../hooks/useFetchProfileGM";
import { useFetchProfilePlayer } from "../../hooks/useFetchProfilePlayer";
import { changeOngoing, deleteRoom } from "../../apis/rooms";
import { deleteUser, modifyUser, userLeavesRoom } from "../../apis/users";
import { LevelsContext } from "../../context/LevelsContext";

export default function Profile() {
    const { idUser } = useParams();

    const { user, setUser } = useContext(AuthContext);

    const levels = useContext(LevelsContext);

    const [modifyFeedBack, setModifyFeedBack] = useState();

    const [willDeleteUser, setWillDeleteUser] = useState(false);

    const [deleteUserFeedBack, setDeleteUserFeedBack] = useState();

    const [allRooms, setAllRooms] = useFetchProfileAllRooms();

    const [GMRooms, setGMRooms] = useFetchProfileGM(idUser);

    const [playerRooms, setPlayerRooms] = useFetchProfilePlayer(idUser);

    const navigate = useNavigate();

    useEffect(() => {
        idUser !== user.idUser &&
            navigate(`../profile/${user.idUser}/${user.username}`);
    }, [idUser, navigate, user.idUser, user.username]);

    const defaultValues = {
        icon: user.icon,
        username: user.username,
        email: user.email,
        idLevel: `${user.idLevel}`,
    };

    const validationSchema = yup.object({
        username: yup
            .string()
            .required("Champ obligatoire")
            .min(2, "Minimum 2 caractères"),
        email: yup
            .string()
            .required("Champ obligatoire")
            .email("Email non valide")
            .matches(
                /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                "Email non valide"
            ),
        idLevel: yup
            .string()
            .required("Votre niveau est nécessaire"),
    });

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        setError,
        clearErrors,
    } = useForm({
        defaultValues,
        resolver: yupResolver(validationSchema),
    });

    const submit = async (values) => {
        try {
            clearErrors();
            const response = await modifyUser({...values, idUser: idUser});
            if (response.idUser) {
                setUser({...user, username: response.username, email: response.email, idLevel: response.idLevel, levelName: response.levelName, icon: response.icon})
                setModifyFeedBack("Profil modifié");
            }
        } catch (error) {
            setModifyFeedBack(null);
            setError("generic", { type: "generic", message: error });
        }
    };

    const handleOngoing = async (params) => {
        const response = await changeOngoing(params);
        setGMRooms(GMRooms?.map((room) => {
            if (room.idRoom !== params.idRoom) {
                return room;
            } else {
                return { ...room, onGoing: response.onGoing };
            }
        }));
        if (allRooms?.length > 0) {
            setAllRooms(allRooms?.map((room) => {
                if (room.idRoom !== params.idRoom) {
                    return room;
                } else {
                    return { ...room, onGoing: response.onGoing };
                }
            }));
        }
    };

    const handleLeaveRoom = async (params) => {
        await userLeavesRoom(params);
        setPlayerRooms(playerRooms.filter((room) => room.idRoom !== params.idRoom));
    };

    const handleDeleteRoom = async (idRoom) => {
        console.log(idRoom);
        await deleteRoom(idRoom);
        if (allRooms) {
            setAllRooms(allRooms.filter((room) => room.idRoom !== idRoom));
            setGMRooms(GMRooms.filter((room) => room.idRoom !== idRoom));
        } else {
            setGMRooms(GMRooms.filter((room) => room.idRoom !== idRoom));
        }
    };

    const handleDeleteUser = async (key) => {
        switch (key) {
            case "delete?":
                setWillDeleteUser(true);
                break;
            case "cancel":
                setWillDeleteUser(false);
                break;
            default:
                console.log("Delete!");
                const response = await deleteUser(idUser);
                if (response.messageError) {
                    setDeleteUserFeedBack(response.messageError);
                } else if (response.message) {
                    setDeleteUserFeedBack(response.message);
                    setTimeout(() => {
                        setWillDeleteUser(false);
                        setDeleteUserFeedBack(null);
                        setUser(null);
                    }, 2000);
                }
        }
    };

    return (
        <main>
            <section className={`page-width center-horizontal ${style.profile}`}>
                <h2>Bienvenue {user.username}</h2>
                <form onSubmit={handleSubmit(submit)} className={`${style.profile_form}`}>
                    <div className={`${style.profile_form_user}`}>
                        <div className={`${style.profile_form_user_icon}`}>
                            {
                                !user.icon ?
                                    <>
                                        <UserBody className={`${style.profile_form_user_icon_body}`} />
                                        <UserDice className={`${style.profile_form_user_icon_dice}`} />
                                    </> :
                                    <img src={``} alt={`Avatar de ${user.username}`} className="room-details-user-icon-avatar" />
                            }
                        </div>
                    </div>
                    <label className="input-text" htmlFor="username">
                        <input id="username" name="username" type="text" placeholder="" {...register("username")} />
                        <span>Nom d'utilisateur</span>
                        {errors.username && <p className="form-error">{errors.username.message}</p>}
                    </label>

                    <label className="input-text" htmlFor="email">
                        <input id="email" name="email" type="email" placeholder="" readOnly {...register("email")} />
                        <span>Email</span>
                        {errors.email && <p className="form-error">{errors.email.message}</p>}
                    </label>

                    <div className={`${style.profile_form_levels_wrapper}`}>
                        <p>Niveau de joueur : </p>
                        <div className={`${style.profile_form_levels_wrapper_content}`}>
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

                    {errors.generic && (
                        <p className="form-error">{errors.generic.message}</p>
                    )}

                    <button disabled={isSubmitting} className="btn btn-phantom">
                        Modifier
                    </button>

                    {
                    modifyFeedBack &&
                    <p className="form-error">{modifyFeedBack}</p>
                    }
                </form>
            </section>

            {
                (user && playerRooms.length > 0) &&
                <section className={`page-width center-horizontal ${style.player}`}>
                    <h2>Salons rejoints :</h2>
                    {
                        playerRooms?.map((room) => (
                            <div key={room.idRoom} className={`${style.player_room}`}>
                                <div className={`${style.player_room_info}`}>
                                    <h3>{room.title}</h3>
                                    <div className={`${style.player_room_info_addon}`}>
                                        <p>Niveau : <span>{room.levelName}</span></p>
                                        <p data-ttrpg-genre={room?.idGenre === 1 ? "fantasy" : room?.idGenre === 2 ? "sci-fi" : "horror-and-other"}>{room.TTRPGName}</p>
                                    </div>
                                </div>
                                <p data-ongoing={room.onGoing}>- Partie en cours -</p>
                                <div className={`${style.player_room_btns}`}>
                                    {
                                        user.idUser === room.joinedIdUser &&
                                        <button className="btn btn-phantom" onClick={() => handleLeaveRoom({ idUser: user.idUser, idRoom: room.idRoom })}>Quitter</button>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </section>
            }

            {
                (user.GM && GMRooms.length > 0) &&
                <section className={`page-width center-horizontal ${style.gm}`}>
                    <h2>Salons crées :</h2>
                    {
                        GMRooms?.map((room) => (
                            <div key={room.idRoom} className={`${style.gm_room}`}>
                                <div className={`${style.gm_room_info}`}>
                                    <h3>{room.title}</h3>
                                    <div className={`${style.gm_room_info_addon}`}>
                                        <p>Niveau : <span>{room.levelName}</span></p>
                                        <p data-ttrpg-genre={room?.idGenre === 1 ? "fantasy" : room?.idGenre === 2 ? "sci-fi" : "horror-and-other"}>{room.TTRPGName}</p>
                                    </div>
                                </div>
                                <p data-ongoing={room.onGoing}>- Partie en cours -</p>
                                <div className={`${style.gm_room_btns}`}>
                                    {
                                        user.idUser === room.idUser &&
                                        <button className="btn btn-phantom" onClick={() => handleOngoing({ idRoom: room.idRoom, onGoing: !room.onGoing })}>{!room.onGoing ? "Démarrer" : "Arrêter"}</button>
                                    }
                                    <button className="btn btn-phantom" onClick={() => handleDeleteRoom(room.idRoom)}>Supprimer</button>
                                </div>
                            </div>
                        ))
                    }
                </section>
            }

            {
                (user.admin && allRooms.length > 0) &&
                <section className={`page-width center-horizontal ${style.admin}`}>
                    <h2>Tous les salons :</h2>
                    {
                        allRooms?.map((room) => (
                            <div key={room.idRoom} className={`${style.admin_room}`}>
                                <div className={`${style.admin_room_info}`}>
                                    <h3>{room.title}</h3>
                                    <div className={`${style.admin_room_info_addon}`}>
                                        <p>Niveau : <span>{room.levelName}</span></p>
                                        <p data-ttrpg-genre={room?.idGenre === 1 ? "fantasy" : room?.idGenre === 2 ? "sci-fi" : "horror-and-other"}>{room.TTRPGName}</p>
                                    </div>
                                </div>
                                <p data-ongoing={room.onGoing}>- Partie en cours -</p>
                                <div className={`${style.admin_room_btns}`}>
                                    {
                                        user.idUser === room.idUser ?
                                            <button className="btn btn-phantom" onClick={() => handleOngoing({ idRoom: room.idRoom, onGoing: !room.onGoing })}>{!room.onGoing ? "Démarrer" : "Arrêter"}</button>
                                            :
                                            user.idUser === room.joinedIdUser ?
                                                <button className="btn btn-phantom">Quitter</button>
                                                :
                                                ""
                                    }
                                    <button className="btn btn-phantom" onClick={() => handleDeleteRoom(room.idRoom)}>Supprimer</button>
                                </div>
                            </div>
                        ))
                    }
                </section>
            }

            <div className={`page-width center-horizontal ${style.delete_account}`}>
                {
                    willDeleteUser &&
                    <button className="btn btn-phantom" onClick={() => handleDeleteUser("cancel")}>
                        Annuler
                    </button>
                }
                <button className={willDeleteUser ? "btn btn-full" : "btn btn-phantom"} onClick={() => willDeleteUser ? handleDeleteUser("delete!") : handleDeleteUser("delete?")}>
                    {willDeleteUser ? "Confirmer" : "Supprimer compte"}
                </button>
            </div>

            {
                deleteUserFeedBack &&
                <p className="form-error">{deleteUserFeedBack}</p>
            }
        </main>
    );
}
