import { useContext, useEffect } from "react";
import { useFetchHomeRooms } from "../../../hooks/useFetchHomeRooms";
import { AuthContext } from "../../../context/AuthContext";
import Room from "../../../components/Room/Room";
import Loading from "../../../components/Loading/Loading";
import AddRoomButton from "../../../components/AddRoomButton/AddRoomButton";

export default function Fantasy() {
    const { user } = useContext(AuthContext);

    const [[fantasyRooms, setFantasyRooms], isLoading] = useFetchHomeRooms(1);

    return (
        isLoading ?
            <Loading />
            :
            <>
                {fantasyRooms?.map((room) => (
                    <Room key={room.idRoom} room={room} fantasyRooms={fantasyRooms} setFantasyRooms={setFantasyRooms} />
                ))}
                {user.admin || user.GM ?
                    <AddRoomButton /> :
                    ""
                }
            </>
    );
}
