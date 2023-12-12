import { useEffect, useState } from "react";
import { getRooms } from "../apis/rooms";

export const useFetchHomeRooms = (idGenre = 0) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const backData = await getRooms(idGenre);
            const booleanBackData = backData?.map((room) => {
                return {
                    ...room,
                    admin: room.admin === 1,
                    icon: !room.icon.data.length ? null : room.icon,
                    onGoing: room.onGoing === 1,
                    finished: room.finished === 1,
                };
            });
            setData(booleanBackData);
        };
        fetchData();
    }, [idGenre]);

    return [data, setData];
};
