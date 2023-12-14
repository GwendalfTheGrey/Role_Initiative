import { useEffect, useState } from "react";
import { getAllRoomsProfile } from "../apis/rooms";

export const useFetchProfileAllRooms = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const backData = await getAllRoomsProfile();
            const booleanBackData = backData?.map((room) => {
                return {
                    ...room,
                    onGoing: room.onGoing === 1
                };
            });
            setData(booleanBackData);
        };
        fetchData();
    }, []);

    return [data, setData];
};
