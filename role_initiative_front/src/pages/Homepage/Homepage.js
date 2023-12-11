import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import HomeConnected from "../../components/HomeConnected/HomeConnected";
import Home from "../../components/Home/Home";

export default function Homepage() {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const body = document.querySelector("body");
        const bodyGenreAttribute = body.getAttribute("data-ttrpg-genre");
        if (bodyGenreAttribute === "fantasy") {
            return
        } else {
            return body.setAttribute("data-ttrpg-genre", "fantasy")
        }
    })

    return (
        <main>
            {user ?
                <HomeConnected /> :
                <Home />
            }
        </main>
    );
}
