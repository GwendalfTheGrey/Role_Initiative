const API_ROOMS = "/api/rooms";

export const getRooms = async (idGenre) => {
    if (!idGenre) {
        const response = await fetch(`${API_ROOMS}/getHomeRooms`);
        return await response.json();
    } else if (idGenre === 1) {
        const response = await fetch(`${API_ROOMS}/getFantasyRooms`);
        return await response.json();
    } else if (idGenre === 2) {
        const response = await fetch(`${API_ROOMS}/getSciFiRooms`);
        return await response.json();
    } else {
        const response = await fetch(`${API_ROOMS}/getHorrorAndOtherRooms`);
        return await response.json();
    }
};