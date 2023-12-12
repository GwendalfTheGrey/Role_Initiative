import { useEffect } from "react";
import { useFetchHomeRooms } from "../../../hooks/useFetchHomeRooms";
import Room from "../../../components/Room/Room";

export default function SciFi() {
    const [sciFiRooms, setSciFiRooms] = useFetchHomeRooms(2);

    useEffect(() => {
        const body = document.querySelector("body");
        const bodyGenreAttribute = body.getAttribute("data-ttrpg-genre");
        if (bodyGenreAttribute === "sci-fi") {
            return;
        } else {
            return body.setAttribute("data-ttrpg-genre", "sci-fi");
        }
    });
    return (
        <>
            {sciFiRooms?.map((room, index) => (
                <Room key={room.idRoom} room={room} />
            ))}
        </>
    );
}
