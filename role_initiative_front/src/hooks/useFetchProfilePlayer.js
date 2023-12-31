import { useEffect, useState } from "react";
import { getPlayerRoomsProfile } from "../apis/rooms";

// CUSTOM HOOK TO FETCH ROOMS ON PROFILE PAGE FOR PLAYERS
export const useFetchProfilePlayer = (idUser) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const backData = await getPlayerRoomsProfile(idUser);
            const booleanBackData = backData?.map((room) => {
                return {
                    ...room,
                    onGoing: room.onGoing === 1
                };
            });
            setData(booleanBackData);
        };
        fetchData();
    }, [idUser]);

    return [data, setData];
};
