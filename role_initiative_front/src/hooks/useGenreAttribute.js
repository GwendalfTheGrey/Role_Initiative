import { useEffect } from "react";

// CUSTOM HOOK TO CHANGE ACCENT COLOR
export const useGenreAttribute = (ttrpgGenre) => {
    useEffect(() => {
        const updateGenreAttribute = () => {
            const body = document.querySelector("body");
            const bodyGenreAttribute = body.getAttribute("data-ttrpg-genre");
            // The first condition of this function takes in consideration every possible scenario in which the data-attribute "data-ttrpg-genre" doesn't need to change it's value
            if ((bodyGenreAttribute === "fantasy" && !ttrpgGenre) || (bodyGenreAttribute === "fantasy" && ttrpgGenre === "fantasy") || (bodyGenreAttribute === "fantasy" && (ttrpgGenre === "room" || ttrpgGenre === "new-room" || ttrpgGenre === "login-register" || ttrpgGenre === "admin" || ttrpgGenre === "profile" || ttrpgGenre === "terms-of-service" || ttrpgGenre === "privacy-policy" || ttrpgGenre === "legal-notices" || ttrpgGenre === "forgotten-password" || ttrpgGenre === "reset-password")) || (bodyGenreAttribute === "sci-fi" && (ttrpgGenre === "sci-fi" || ttrpgGenre === "profile" || ttrpgGenre === "terms-of-service" || ttrpgGenre === "privacy-policy" || ttrpgGenre === "legal-notices")) || (bodyGenreAttribute === "horror-and-other" && (ttrpgGenre === "horror-and-other" || ttrpgGenre === "profile" || ttrpgGenre === "terms-of-service" || ttrpgGenre === "privacy-policy" || ttrpgGenre === "legal-notices"))) {
                return;
            }
            // The second condition allows for "data-ttrpg-genre" to change to "fantasy" if the data-attribute doesn't have this value already, the same goes for "ttrpg", and lastly if the data-attribute doesn't have this value but "ttrpg" does or if it has the value of "room" or "new-room"
            else if ((bodyGenreAttribute !== "fantasy" && !ttrpgGenre) || (bodyGenreAttribute !== "fantasy" && ttrpgGenre === "fantasy") || (bodyGenreAttribute !== "fantasy" && (ttrpgGenre === "room" || ttrpgGenre === "new-room"))) {
                return body.setAttribute("data-ttrpg-genre", "fantasy");
            }
            // The same logic that applies for the second condition applies here too except for the fact that we are dealing with the value "sci-fi"
            else if (bodyGenreAttribute !== "sci-fi" && ttrpgGenre === "sci-fi") {
                return body.setAttribute("data-ttrpg-genre", "sci-fi");
            }
            // And lastly for every other scenario the value of "data-ttrpg-genre" changes to "horror-and-other"
            else {
                return body.setAttribute("data-ttrpg-genre", "horror-and-other");
            }
        };
        updateGenreAttribute();
    }, [ttrpgGenre]);
};