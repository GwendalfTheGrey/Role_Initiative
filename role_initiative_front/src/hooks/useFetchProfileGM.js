import { useEffect, useState } from "react";
import { getGMRoomsProfile } from "../apis/rooms";

// CUSTOM HOOK TO FETCH ROOMS ON PROFILE PAGE FOR GAME MASTERS
export const useFetchProfileGM = (idUser) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const backData = await getGMRoomsProfile(idUser);
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
