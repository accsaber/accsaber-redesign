import { createContext, useContext } from "react";

const UserContext = createContext<{ playerId: string } | null>(null);

export default UserContext;

export const useUser = () => useContext(UserContext);
