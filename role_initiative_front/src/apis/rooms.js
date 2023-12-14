const API_ROOMS = "/api/rooms";

export const getUsersJoined = async () => {
    const response = await fetch(`${API_ROOMS}/getUsersJoined`);
    return await response.json();
};

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

export const getRoomDetails = async (idRoom) => {
    const response = await fetch(`${API_ROOMS}/getRoomDetails/${idRoom}`);
    return await response.json();
};

export const getAllRoomsProfile = async () => {
    const response = await fetch(`${API_ROOMS}/getAllRoomsProfile`);
    return await response.json();
};

export const getGMRoomsProfile = async (idUser) => {
    const response = await fetch(`${API_ROOMS}/getGMRoomsProfile/${idUser}`);
    return await response.json();
};

export const getPlayerRoomsProfile = async (idUser) => {
    const response = await fetch(`${API_ROOMS}/getPlayerRoomsProfile/${idUser}`);
    return await response.json();
};

export const changeOngoing = async (params) => {
    const response = await fetch(`${API_ROOMS}/roomDetails/changeOngoing`, {
        method: "PATCH",
        body: JSON.stringify(params),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        return await response.json();
    }
};

export const createRoom = async (values) => {
    const response = await fetch(`${API_ROOMS}/createRoom`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (response.ok) {
        return await response.json();
    }
}

export const deleteRoom = async (idRoom) => {
    const response = await fetch(`${API_ROOMS}/deleteRoom/${idRoom}`, {
        method: "DELETE",
    });
}