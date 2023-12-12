import { ReactComponent as UserBody } from "../../assets/images/user-silhouette.svg";
import { ReactComponent as UserDice } from "../../assets/images/user-dice.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Room({ room, usersJoined }) {
    const { user } = useContext(AuthContext);

    const { idUser, idGenre, username, icon, adminCreated, title, description, TTRPGName, levelName } = room;
    
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
            <div className="room-informations">
                {
                    user.idUser === idUser || user.admin ?
                    <>
                        <button className="btn btn-phantom">Supprimer</button>
                    </> : 
                    ""
                }
                <Link>Voir plus</Link>
            </div>
        </div>
    );
}
