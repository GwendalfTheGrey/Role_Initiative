import { useEffect, useState } from "react";
import { getUserJoinedRoom } from "../apis/users";

// CUSTOM HOOK TO CHECK IF USER HAS JOINED SPECIFIC ROOM, TO ADD TO USE OF useFetchOneRoom
export const useFetchUserJoinedRoom = (idUser, idRoom) => {
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const backData = await getUserJoinedRoom(idUser, idRoom);
            setData(backData[0]);
        };
        fetchData();
    }, [idUser, idRoom]);

    return [data, setData];
};