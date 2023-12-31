import { useEffect, useState } from "react";
import { getRooms } from "../apis/rooms";

// CUSTOM HOOK TO FETCH ROOMS ON HOMEPAGE
export const useFetchHomeRooms = (idGenre = 0) => {
    const [data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const backData = await getRooms(idGenre);
            const booleanBackData = backData?.map((room) => {
                return {
                    ...room,
                    icon: !room.icon.data.length ? null : room.icon,
                    description: room.description.replace(/\r\n/g, '\n'),
                };
            });
            setData(booleanBackData);
            setIsLoading(false);
        };
        fetchData();
    }, [idGenre]);

    return [[data, setData], isLoading];
};
