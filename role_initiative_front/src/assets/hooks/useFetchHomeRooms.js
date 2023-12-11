import { useEffect, useState } from "react";
import { getRooms } from "../../apis/rooms";

export const useFetchHomeRooms = (idGenre = 0) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const backData = await getRooms(idGenre);
            setData(backData);
        };
        fetchData();
    }, [idGenre]);

    return [data, setData];
};
