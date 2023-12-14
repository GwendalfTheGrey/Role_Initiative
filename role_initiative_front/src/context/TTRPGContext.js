import { createContext, useEffect, useState } from "react";
import { getTTRPG } from "../apis/ttrpg";

export const TTRPGContext = createContext();

export const TTRPGProvider = ({ children }) => {
    const [TTRPG, setTTRPG] = useState();

    useEffect(() => {
        const TTRPGList = async () => {
            const TTRPGBack = await getTTRPG();
            setTTRPG(TTRPGBack);
        };
        TTRPGList();
    }, []);

    return (
        <TTRPGContext.Provider value={TTRPG}>
            {children}
        </TTRPGContext.Provider>
    );
};