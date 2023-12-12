import { createContext, useEffect, useState } from "react";
import { getLevels } from "../apis/levels";

export const LevelsContext = createContext();

export const LevelsProvider = ({ children }) => {
    const [levels, setLevels] = useState();

    useEffect(() => {
        const levelList = async () => {
            const levelsBack = await getLevels();
            setLevels(levelsBack);
        };
        levelList();
    }, []);

    return (
        <LevelsContext.Provider value={levels}>
            {children}
        </LevelsContext.Provider>
    );
};