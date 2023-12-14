import { ReactComponent as UserBody } from "../../assets/images/user-silhouette.svg";
import { ReactComponent as UserDice } from "../../assets/images/user-dice.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { deleteRoom } from "../../apis/rooms";

export default function Room({ room, homeRooms = null, setHomeRooms, fantasyRooms = null, setFantasyRooms, sciFiRooms = null, setSciFiRooms, horrorAndOtherRooms = null, setHorrorAndOtherRooms }) {
    const { user } = useContext(AuthContext);

    const { idRoom, idUser, idGenre, username, icon, title, description, TTRPGName, levelName } = room;

    const handleDelete = async (idRoom) => {
        await deleteRoom(idRoom);
        if (homeRooms) {
            setHomeRooms(homeRooms.filter((room) => room.idRoom !== idRoom));
        } 
        if (fantasyRooms) {
            setFantasyRooms(fantasyRooms.filter((room) => room.idRoom !== idRoom));
        }
        if (sciFiRooms) {
            setSciFiRooms(sciFiRooms.filter((room) => room.idRoom !== idRoom));
        }
        if (horrorAndOtherRooms) {
            setHorrorAndOtherRooms(horrorAndOtherRooms.filter((room) => room.idRoom !== idRoom));
        }
    };

    return (
        <div className="room">
            <div className="room-user">
                <div className="room-user-icon">
                    {
                        !icon ?
                            <>
                                <UserBody className="room-user-icon-body" />
                                <UserDice className="room-user-icon-dice" />
                            </> :
                            <img src={``} alt={`Avatar de ${username}`} className="room-user-icon-avatar" />
                    }
                </div>
                <p>@{username}</p>
            </div>
            <div className="room-content">
                <h2>{title}</h2>
                <div className="room-content-details">
                    <p data-ttrpg-genre={idGenre === 1 ? "fantasy" : idGenre === 2 ? "sci-fi" : "horror-and-other"}>{TTRPGName}</p>
                    <p>Niveau : <span>{levelName}</span></p>
                </div>
                <p>{description}</p>
            </div>
            <div className="room-addons">
                <Link to={`room/${idRoom}/${title}`}>Voir plus</Link>
                {
                    user.idUser === idUser || user.admin ?
                        <>
                            <button className="btn btn-phantom" onClick={() => handleDelete(idRoom)}>Supprimer</button>
                        </> :
                        ""
                }
            </div>
        </div>
    );
}
