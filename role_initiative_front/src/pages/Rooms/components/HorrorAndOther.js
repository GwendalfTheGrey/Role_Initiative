import { useContext, useEffect } from "react";
import { useFetchHomeRooms } from "../../../hooks/useFetchHomeRooms";
import { AuthContext } from "../../../context/AuthContext";
import Room from "../../../components/Room/Room";
import Loading from "../../../components/Loading/Loading";
import AddRoomButton from "../../../components/AddRoomButton/AddRoomButton";

export default function HorrorAndOther() {
    const { user } = useContext(AuthContext);

    const [[horrorAndOtherRooms, setHorrorAndOtherRooms], isLoading] = useFetchHomeRooms(3);

    return (
        isLoading ?
            <Loading />
            :
            <>
                {horrorAndOtherRooms?.map((room) => (
                    <Room key={room.idRoom} room={room} horrorAndOtherRooms={horrorAndOtherRooms} setHorrorAndOtherRooms={setHorrorAndOtherRooms} />
                ))}
                {user.admin || user.GM ?
                    <AddRoomButton /> :
                    ""
                }
            </>
    );
}
