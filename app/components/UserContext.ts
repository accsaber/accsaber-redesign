import type { Player } from "$interfaces/api/player";
import { createContext, useContext } from "react";

const UserContext = createContext<Promise<Player> | null>(null);

export default UserContext;

export const useUser = () => useContext(UserContext);
