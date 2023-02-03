import { ThemeContext } from "@yourapp/theme";
import { useContext } from "react";

function useTheme() {
  const theme = useContext(ThemeContext);
  return theme;
}

export default useTheme;
