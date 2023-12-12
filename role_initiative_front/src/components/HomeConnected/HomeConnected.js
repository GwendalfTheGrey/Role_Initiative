import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useFetchHomeRooms } from "../../hooks/useFetchHomeRooms";
import style from "./HomeConnected.module.scss";
import Room from "../Room/Room";

export default function HomeConnected() {
    const { user } = useContext(AuthContext);

    const [rooms, setRooms] = useFetchHomeRooms();

    return (
        <section className={`page-width page-max-width center-horizontal ${style.rooms_wrapper}`}>
            {rooms?.map((room, index) => (
                <Room key={room.idRoom} room={room} />
            ))}
            
            {user.admin || user.GM ?
                <div className="add-room"></div> :
                ""
            }
        </section>
    );
}
