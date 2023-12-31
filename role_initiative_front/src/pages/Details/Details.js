import { Link, useNavigate, useParams, } from "react-router-dom";
import { useFetchOneRoom } from "../../hooks/useFetchOneRoom";
import Loading from "../../components/Loading/Loading";
import { ReactComponent as UserBody } from "../../assets/images/user-silhouette.svg";
import { ReactComponent as UserDice } from "../../assets/images/user-dice.svg";
import { ReactComponent as DiscordLogo } from "../../assets/images/discord-logo.svg";
import style from "./Details.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { changeOngoing, deleteRoom } from "../../apis/rooms";
import { useFetchUserJoinedRoom } from "../../hooks/useFetchUserJoinedRoom";
import { userJoinsRoom, userLeavesRoom } from "../../apis/users";

// DETAILS FOR A SPECIFIC ROOM
export default function Details() {
    const { idRoom } = useParams();

    const { user } = useContext(AuthContext);

    const [[roomDetails, setRoomDetails], isLoading] = useFetchOneRoom(idRoom);

    const [userJoinedRoom, setUserJoinedRoom] = useFetchUserJoinedRoom(user.idUser, idRoom);

    const navigate = useNavigate();

    const handleJoin = async (params) => {
        if (!userJoinedRoom) {
            const response = await userJoinsRoom(params);
            setUserJoinedRoom(response);
        } else {
            await userLeavesRoom(params);
            setUserJoinedRoom(null);
        }
    };

    const handleOngoing = async (params) => {
        const response = await changeOngoing(params);
        setRoomDetails({ ...roomDetails, onGoing: response.onGoing });
    };

    const handleDelete = async (idRoom) => {
        await deleteRoom(idRoom);
        navigate("/");
    };

    return (
        <main>
            {
                isLoading ?
                    <section className={`page-width center-horizontal ${style.room_wrapper}`}>
                        <Loading />
                    </section>
                    :
                    <section className={`page-width center-horizontal room-details ${style.room_wrapper}`}>
                        <p data-ongoing={roomDetails.onGoing}>- Partie en cours -</p>
                        <div className="room-details-user">
                            <div className="room-details-user-icon">
                                {
                                    !roomDetails?.icon ?
                                        <>
                                            <UserBody className="room-details-user-icon-body" />
                                            <UserDice className="room-details-user-icon-dice" />
                                        </> :
                                        <img src={``} alt={`Avatar de ${roomDetails?.username}`} className="room-details-user-icon-avatar" />
                                }
                            </div>
                            <p className="room-details-user-username">@{roomDetails?.username}</p>
                        </div>
                        <div className="room-details-content">
                            <h2>{roomDetails?.title}</h2>
                            <div className="room-details-content-details">
                                <p data-ttrpg-genre={roomDetails?.idGenre === 1 ? "fantasy" : roomDetails?.idGenre === 2 ? "sci-fi" : "horror-and-other"}>{roomDetails.TTRPGName}</p>
                                <p>Niveau : <span>{roomDetails?.levelName}</span></p>
                            </div>
                            <p>{roomDetails.description}</p>
                        </div>
                        {
                            roomDetails?.discord &&
                            <Link className="discord" title="Discord pour la partie" to="https://discord.com/">
                                <DiscordLogo />
                            </Link>
                        }
                        <div className="room-details-actions">
                            {
                                user.idUser === roomDetails?.idUser ?
                                    <button className="btn btn-phantom" onClick={() => handleOngoing({ idRoom: roomDetails.idRoom, onGoing: !roomDetails.onGoing })}>{!roomDetails.onGoing ? "Démarrer" : "Arrêter"}</button>
                                    :
                                    <button className="btn btn-phantom" onClick={() => handleJoin({ idUser: user.idUser, idRoom: idRoom })} disabled={(roomDetails.onGoing && !userJoinedRoom) || user.idLevel < roomDetails.idLevel}>{!userJoinedRoom ? "Rejoindre" : "Quitter"}</button>
                            }
                            {
                                user.idUser === roomDetails?.idUser || user.admin ?
                                    <button className="btn btn-phantom" onClick={() =>  handleDelete(idRoom)}>Supprimer</button>
                                    :
                                    ""
                            }
                        </div>
                    </section>
            }
        </main>
    );
}
