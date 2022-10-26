import { createContext } from "react";

const DarkModeContext = createContext({
  dark: false,
  setDarkMode(mode: boolean) {},
});

export default DarkModeContext;
