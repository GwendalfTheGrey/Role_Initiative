import { getConnectedUser } from "../apis/users";

// LOADER TO CHECK IF USER HAS COOKIE TO STAY CONNECTED, USED IN ROUTER AS APP LOADER
export async function userLoader() {
    return getConnectedUser();
}