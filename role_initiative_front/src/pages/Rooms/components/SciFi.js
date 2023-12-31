import { useContext } from "react";
import { useFetchHomeRooms } from "../../../hooks/useFetchHomeRooms";
import { AuthContext } from "../../../context/AuthContext";
import Room from "../../../components/Room/Room";
import Loading from "../../../components/Loading/Loading";
import AddRoomButton from "../../../components/AddRoomButton/AddRoomButton";

export default function SciFi() {
    const { user } = useContext(AuthContext);

    const [[sciFiRooms, setSciFiRooms], isLoading] = useFetchHomeRooms(2);

    return (
        isLoading ?
            <Loading />
            :
            <>
                {sciFiRooms?.map((room) => (
                    <Room key={room.idRoom} room={room} sciFiRooms={sciFiRooms} setSciFiRooms={setSciFiRooms} />
                ))}
                {user.admin || user.GM ?
                    <AddRoomButton /> :
                    ""
                }
            </>
    );
}
