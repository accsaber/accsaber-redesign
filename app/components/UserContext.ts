import { createContext, useContext } from "react";
import type { Player } from "~/lib/interfaces/api/player";

const UserContext = createContext<Player | null>(null);

export default UserContext;

export const useUser = () => useContext(UserContext);
