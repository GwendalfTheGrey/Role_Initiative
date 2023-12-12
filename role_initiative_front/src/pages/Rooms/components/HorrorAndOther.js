import { useEffect } from "react";
import { useFetchHomeRooms } from "../../../hooks/useFetchHomeRooms";
import Room from "../../../components/Room/Room";

export default function HorrorAndOther() {
    const [horrorAndOtherRooms, setHorrorAndOtherRooms] = useFetchHomeRooms(3);

    useEffect(() => {
        const body = document.querySelector("body");
        const bodyGenreAttribute = body.getAttribute("data-ttrpg-genre");
        if (bodyGenreAttribute === "horror-and-other") {
            return;
        } else {
            return body.setAttribute("data-ttrpg-genre", "horror-and-other");
        }
    });
    return (
        <>
            {horrorAndOtherRooms?.map((room, index) => (
                <Room key={room.idRoom} room={room} />
            ))}
        </>
    );
}
