import { useEffect, useState } from "react";
import { getGMRoomsProfile } from "../apis/rooms";

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
