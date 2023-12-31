const API_USERS = "/api/users";

export const resetPassword = async (email) => {
    const response = await fetch(`${API_USERS}/resetPassword/${email}`);
    const backResponse = await response.json();
    if (response.ok) {
        return backResponse;
    } else {
        if (backResponse) {
            throw backResponse;
        } else {
            throw new Error("API Reset Password Error");
        }
    }
};

export const changePassword = async (password, email) => {
    const response = await fetch(`${API_USERS}/changePassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email })
    });
    const backResponse = await response.json();
    if (response.ok) {
        return backResponse;
    } else {
        if (backResponse) {
            throw backResponse;
        } else {
            throw new Error("API Change Password Error");
        }
    }
};