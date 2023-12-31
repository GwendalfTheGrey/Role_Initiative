
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useFetchHomeRooms } from "../../hooks/useFetchHomeRooms";
import style from "./HomeConnected.module.scss";
import Room from "../Room/Room";
import Loading from "../Loading/Loading";
import AddRoomButton from "../AddRoomButton/AddRoomButton";

// HOMEPAGE USER CONNECTED
export default function HomeConnected() {
    const { user } = useContext(AuthContext);

    const [[rooms, setRooms], isLoading] = useFetchHomeRooms();

    return (

        isLoading ?
            <section className={`page-width page-max-width center-horizontal ${style.rooms_wrapper}`}>
                <Loading />
            </section>
            
            :

            <section className={`page-width page-max-width center-horizontal ${style.rooms_wrapper}`}>
                {rooms?.map((room) => (
                    <Room key={room.idRoom} room={room} homeRooms={rooms} setHomeRooms={setRooms} />
                ))}

                {user.admin || user.GM ?
                    <AddRoomButton /> :
                    ""
                }
            </section>
    );
}
