export const getTTRPG = async () => {
    const response = await fetch("/api/ttrpg/getTTRPG");
    return await response.json();
};