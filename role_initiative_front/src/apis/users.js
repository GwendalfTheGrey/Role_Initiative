const API_USERS = "/api/users";

export const createUser = async (newUser) => {
    const response = await fetch(`${API_USERS}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
    });
    const backResponse = await response.json();
    if (response.ok) {
        return backResponse
    } else {
        if (backResponse) {
            throw backResponse;
        } else {
            throw new Error("API Create User Error");
        }
    }
};

export const signIn = async (values) => {
    const response = await fetch(`${API_USERS}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    });
    const backResponse = await response.json();
    if (response.ok) {
        return backResponse;
    } else {
        if (backResponse) {
            throw backResponse;
        } else {
            throw new Error("API Login Error");
        }
    }
};

export const getConnectedUser = async () => {
    const response = await fetch(`${API_USERS}/connectedUser`);
    return await response.json();
};

export const signOut = async () => {
    const response = await fetch(`${API_USERS}/logout`, {
        method: "DELETE",
    });
};

export const getUserJoinedRoom = async (idUser, idRoom) => {
    const response = await fetch(`${API_USERS}/getUserJoinedRoom/${idUser}/${idRoom}`);
    return await response.json();
};

export const userJoinsRoom = async (params) => {
    const response = await fetch(`${API_USERS}/userJoinsRoom`, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        return await response.json();
    }
};

export const userLeavesRoom = async (params) => {
    const response = await fetch(`${API_USERS}/userLeavesRoom`, {
        method: "DELETE",
        body: JSON.stringify(params),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const modifyUser = async (values) => {
    const response = await fetch(`${API_USERS}/modifyUser`, {
        method: "PATCH",
        body: JSON.stringify(values),
        headers: {
            "Content-Type": "application/json",
        },
    })
    const backResponse = await response.json()
    if (response.ok) {
        return backResponse
    } else {
        if(backResponse) {
            return backResponse
        } else {
            throw new Error("API Modify User Error")
        }
    }
}

export const deleteUser = async (idUser) => {
    const response = await fetch(`${API_USERS}/deleteUser/${idUser}`, {
        method: "DELETE",
    })
    const backResponse = await response.json();
    if (response.ok) {
        return backResponse
    } else {
        if(backResponse) {
            return backResponse
        } else {
            throw new Error("API Delete User Error")
        }
    }
}