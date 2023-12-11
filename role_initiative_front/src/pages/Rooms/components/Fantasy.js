import { useEffect } from "react";
import { useFetchHomeRooms } from "../../../assets/hooks/useFetchHomeRooms";
import Room from "../../../components/Room/Room";

export default function Fantasy() {
    const [fantasyRooms, setFantasyRooms] = useFetchHomeRooms(1);

    useEffect(() => {
        const body = document.querySelector("body");
        const bodyGenreAttribute = body.getAttribute("data-ttrpg-genre");
        if (bodyGenreAttribute === "fantasy") {
            return;
        } else {
            return body.setAttribute("data-ttrpg-genre", "fantasy");
        }
    });
    return (
        <>
            {fantasyRooms?.map((room, index) => (
                <Room key={room.idRoom} room={room} />
            ))}
        </>
    );
}
