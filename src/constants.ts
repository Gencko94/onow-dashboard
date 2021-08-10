import { DefaultTheme } from "styled-components";

export const lightTheme: any = {
  background: "hsl(0, 0%, 100%)",
  shadow: "0px 4px 7px 2px rgb(213,213,213)",
  errorShadow: "0px 0px 10px 0px #b72b2b",
  green: "#0B9B23",
  dangerRed: "#b72b2b",
  border: "1px solid rgba(0,0,0,0.1)",
  borderHovered: "rgba(0,0,0,0.3)",
  seperator: "rgba(0,0,0,0.1)",
  boxColor: "#fff",
  // New Color
  text: "#252525",
  textContrast: "#fff",
  textAlt: "#737373",
  textAltContrast: "#fbfbfb",
  // New Accents
  accent1: "#fafafa",
  accent2: "#f1f1f1",
  accent3: "#eaeaea",
  blue: "#2e87fc",
};
lightTheme.subtleBackground = "hsl(255,25%,95%)";
lightTheme.subtleFloating = lightTheme.background;
lightTheme.sidebarBackground = "hsl(210deg, 22%, 15%)";
lightTheme.sidebarSubtleBackground = "hsl(210,30%,8%)";
export const darkTheme: any = {
  background: "hsl(210,30%,8%)",
  boxColor: "#D8d8d8",
  shadow: "none",
  errorShadow: "0px 0px 10px 0px #b72b2b",
  green: "#1AD439",
  dangerRed: "hsl(0, 100%, 69.6%)",
  border: "1px solid #D8D8D8",
  seperator: "rgba(250,250,250,0.3)",
  borderHovered: "rgba(255,255,255,0.7)",
  // New Color
  text: "#fff",
  textContrast: "#252525",
  textAlt: "#ececec",
  textAltContrast: "#fbfbfb",
  // New Accents
  accent1: "#111",
  accent2: "#222",
  accent3: "#333",
  blue: "#2e87fc",
};
darkTheme.subtleBackground = darkTheme.background;
darkTheme.subtleFloating = "hsl(210deg, 22%, 15%)";
darkTheme.sidebarBackground = "hsl(210deg, 22%, 15%)";
darkTheme.sidebarSubtleBackground = darkTheme.subtleBackground;
// darkTheme.sidebarBackground = darkTheme.subtleBackground;
export const up = (breakpoint: string) => `@media (min-width: ${breakpoint})`;
export const down = (breakpoint: string) => `@media (max-width: ${breakpoint})`;
