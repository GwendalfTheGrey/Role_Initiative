import { useEffect, useState } from "react";
import { getUsersJoined } from "../apis/rooms";

export const useFetchUsersJoined = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const backData = await getUsersJoined();
            setData(backData);
        };
        fetchData();
    }, []);

    return [data, setData];
};
