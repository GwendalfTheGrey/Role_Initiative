const API_USERS = "/api/users";

export const createUser = async (newUser) => {
    console.log("test");
    const response = await fetch(`${API_USERS}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
    });
    const backResponse = await response.json();
    if (response.ok) {
        console.log(`${backResponse.username} created`);
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
        console.log(backResponse);
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

export const signOut = async (values) => {
    const response = await fetch(`${API_USERS}/logout`, {
        method: "DELETE",
    });
};