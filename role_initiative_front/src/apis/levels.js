export const getLevels = async () => {
    const response = await fetch("/api/levels/getLevels");
    return await response.json();
};