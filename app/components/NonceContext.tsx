import { createContext, useContext } from "react";

const NonceContext = createContext<string | undefined>(undefined);

export default NonceContext;

export const useNonce = () => useContext(NonceContext);
