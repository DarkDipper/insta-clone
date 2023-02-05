import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { configTheme } from "./config";
import useAuth from "@yourapp/hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

export const ThemeContext = createContext<{
  mode: string;
  toggleMode: () => void;
  setMode: undefined | Dispatch<SetStateAction<string>>;
}>(configTheme);

export default function ThemeProvider({ children }: Props) {
  const { user } = useAuth();
  const [mode, setMode] = useState(configTheme.mode);
  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };
  useEffect(() => {
    if (user?.theme) {
      setMode(user?.theme);
    }
  }, [user]);
  return (
    <ThemeContext.Provider value={{ mode, toggleMode, setMode }}>
      <div className={mode}>{children}</div>
    </ThemeContext.Provider>
  );
}
