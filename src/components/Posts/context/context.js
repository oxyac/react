import {createContext} from "react";

export const userContext = createContext({
    username: '',
    timeLoggedIn: 0,
    accessLevel: 0
});
