// src/context/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import theme from "../global/theme";
type ThemeType = keyof typeof theme;

interface ThemeContextProps {
  themeName: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  themeName: "light",
  toggleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeType>("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as ThemeType | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (systemPrefersDark ? "dark" : "light");
    setThemeName(initial);
  }, []);

  const toggleTheme = () => {
    const newTheme = themeName === "light" ? "dark" : "light";
    setThemeName(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <StyledThemeProvider theme={theme[themeName]}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
