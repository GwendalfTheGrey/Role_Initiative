import { createContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { signIn, signOut } from "../apis/users";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const connectUser = useLoaderData();
    const [user, setUser] = useState(connectUser);

    const login = async (values) => {
        const userLoggingIn = await signIn(values);
        setUser(userLoggingIn);
    };

    const logout = async () => {
        await signOut();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};