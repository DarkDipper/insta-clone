import { createContext, useState } from "react";
import { configTheme } from "./config";

type Props = {
  children: React.ReactNode;
};

export const ThemeContext = createContext(configTheme);

export default function ThemeProvider({ children }: Props) {
  const [mode, setMode] = useState(configTheme.mode);
  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };
  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <div className={mode}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
