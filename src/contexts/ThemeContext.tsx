import React, { createContext, useCallback, useMemo, useState } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import styled, { ThemeProvider as StyledThemes } from "styled-components";
import i18nConfig from "../i18n";
import Color from "color";
import { getInitialColorMode } from "../helpers/getInitialColorMode";
import { BREAKPOINTS, darkTheme, lightTheme } from "../constants";
export type ThemeMode = "light" | "dark";

type ContextProps = {
  toggleTheme: () => void;
  colorMode: ThemeMode;
  currentTheme: any;
};

export const ThemeContext = createContext<Partial<ContextProps>>({});

const ThemeProvider: React.FC = ({ children }) => {
  const [colorMode, setColorMode] = useState<ThemeMode>(getInitialColorMode());
  const { i18n } = useTranslation();
  // TODO : Remember to Attach RTL to Theme. so changing directions become easy.
  const fontFamily = useMemo(
    // () => (i18n.language === "ar" ? "Cairo" : "Noto Sans JP"),
    // () => (i18n.language === "ar" ? "Cairo" : "apple-System"),
    () =>
      i18n.language === "ar"
        ? "Cairo"
        : "-apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
    [i18n.language]
  );

  const currentTheme = useMemo(() => {
    const theme =
      colorMode === "light"
        ? {
            ...lightTheme,
            primary: "hsl(31, 100%, 60%)",
            secondary: "hsl(248, 54%, 49%)",
          }
        : {
            ...darkTheme,
            primary: "hsl(23, 100%, 67%)",
            secondary: "hsla(222, 100%, 58%, 1)",
          };
    return {
      fontFamily,
      breakpoints: BREAKPOINTS,
      maxWidthMd: "960px",
      maxWidthLg: "1100px",
      yellow: "#f5a623",
      borderDanger: "1px solid #b72b2b",
      primaryLighter: Color(theme.primary).lighten(0.2).hex(),
      primaryDarker: Color(theme.primary).darken(0.2).hex(),
      font: {
        light: "300",
        regular: "400",
        semibold: "500",
        bold: "700",
        xbold: "900",
      },
      ...theme,
    };
  }, [colorMode, fontFamily]);

  const toggleTheme = useCallback(() => {
    if (colorMode === "light") {
      setColorMode("dark");
      localStorage.setItem("onow-color-mode", "dark");
    } else {
      setColorMode("light");
      localStorage.setItem("onow-color-mode", "light");
    }
  }, [colorMode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, colorMode, currentTheme }}>
      <StyledThemes theme={currentTheme}>
        <I18nextProvider i18n={i18nConfig}>
          <Container lang={i18n.language}>{children}</Container>
        </I18nextProvider>
      </StyledThemes>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
const Container = styled.div<{ lang: string }>`
  direction: ${(props) => (props.lang === "ar" ? "rtl" : "ltr")};
`;
