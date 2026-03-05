import { createContext, useContext, useState } from "react";

// Create context
export const ThemeContext = createContext();

// Create custom hook
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};

// Provider
export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  const theme = {
    backgroundColor: dark ? "black" : "white",
    color: dark ? "white" : "black",
  };

  const toggleTheme = () => {
    setDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ dark, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
