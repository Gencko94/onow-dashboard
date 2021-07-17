import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import styled, { ThemeProvider as StyledThemes } from "styled-components";
import { devices } from "../utils/breakpoints";
import { darkTheme, lightTheme } from "../utils/themes";
import Color from "color";
export type ThemeMode = "light" | "dark" | string;

type ContextProps = {
  toggleTheme: () => void;
  mode: ThemeMode;
  currentTheme: any;
};

export const ThemeContext = createContext<Partial<ContextProps>>({});

const ThemeProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>("light");
  const { i18n } = useTranslation();

  const fontFamily = useMemo(
    // () => (i18n.language === "ar" ? "Cairo" : "Noto Sans JP"),
    () => (i18n.language === "ar" ? "Cairo" : "apple-System"),
    [i18n.language]
  );

  const currentTheme = useMemo(() => {
    const theme = mode === "light" ? { ...lightTheme } : darkTheme;
    return {
      fontFamily,
      breakpoints: devices,
      maxWidthMd: "960px",
      maxWidthLg: "1100px",
      yellow: "#f5a623",
      borderDanger: "1px solid #e23e3eac",
      primary: Color(theme.mainColor).lighten(0.2).hex(),
      primaryLighter: Color(theme.mainColor).lighten(0.2).hex(),
      primaryDarker: Color(theme.mainColor).darken(0.2).hex(),
      font: {
        light: "300",
        regular: "400",
        semibold: "500",
        bold: "700",
        xbold: "900",
      },
      ...theme,
    };
  }, [mode, fontFamily]);

  const toggleTheme = useCallback(() => {
    if (mode === "light") {
      setMode("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setMode("light");
      localStorage.setItem("theme", "light");
    }
  }, [mode]);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    localTheme && setMode(localTheme);
  }, []);
  return (
    <ThemeContext.Provider value={{ toggleTheme, mode, currentTheme }}>
      <StyledThemes theme={currentTheme}>
        <Container lang={i18n.language}>{children}</Container>
      </StyledThemes>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
const Container = styled.div<{ lang: string }>`
  /* font-family: ${(props) => props.theme.fontFamily}; */
  direction: ${(props) => (props.lang === "ar" ? "rtl" : "ltr")};
`;
