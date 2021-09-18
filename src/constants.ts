import { Devices } from "./interfaces/breakpoints/breakpoints";
export const customerUri = "https://new-version.o-now.net/customer-api";

export const lightTheme: any = {
  background: "hsl(255,25%,95%)",
  shadow: "0px 4px 7px 2px rgb(213,213,213)",
  errorShadow: "0px 0px 10px 0px #b72b2b",
  green: "#0B9B23",
  dangerRed: "#b72b2b",
  border: "1px solid rgba(0,0,0,0.1)",
  borderHovered: "rgba(0,0,0,0.3)",
  stickyNav: "hsla(0, 0%, 100%, 0.8)",
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
lightTheme.subtleFloating = "hsl(0, 0%, 100%)";
lightTheme.subtleBackground = "hsl(0, 4%, 99%)";

lightTheme.sidebarBackground = "hsl(210deg, 22%, 15%)";
lightTheme.sidebarSubtleBackground = "hsl(210,30%,8%)";
export const darkTheme: any = {
  background: "hsl(210,30%,8%)",

  shadow: "none",
  errorShadow: "0px 0px 10px 0px #b72b2b",
  green: "#1AD439",
  dangerRed: "hsl(0, 100%, 69.6%)",
  border: "1px solid hsl(248, 54%, 49%)",
  borderHovered: "rgba(255,255,255,0.7)",
  stickyNav: "hsla(248, 1%, 11%, 0.8)",
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
// darkTheme.subtleBackground = darkTheme.background;
darkTheme.subtleBackground = "hsl(210, 22%, 25%)";
// darkTheme.subtleBackground = "hsl(210,30%,8%)";
darkTheme.subtleFloating = "hsl(210, 22%, 15%)";

darkTheme.sidebarBackground = "hsl(210, 22%, 15%)";
darkTheme.sidebarSubtleBackground = darkTheme.subtleBackground;
// darkTheme.sidebarBackground = darkTheme.subtleBackground;
// export const up = (breakpoint: string) => `@media (min-width: ${breakpoint})`;
// export const down = (breakpoint: string) => `@media (max-width: ${breakpoint})`;
export const BREAKPOINT_SIZES = {
  xs: 320,
  sm: 563,
  md: 768,
  lg: 1024,
  xl: 1440,
};
export const BREAKPOINTS: Devices = {
  xs: `(max-width: ${BREAKPOINT_SIZES.xs}px)`,
  sm: `(min-width: ${BREAKPOINT_SIZES.sm}px and max-width: ${BREAKPOINT_SIZES.sm}px)`,
  md: `(min-width: ${BREAKPOINT_SIZES.sm}px and max-width: ${BREAKPOINT_SIZES.md}px)`,
  lg: `(min-width: ${BREAKPOINT_SIZES.md}px and max-width: ${BREAKPOINT_SIZES.lg}px)`,
  xl: `(min-width: ${BREAKPOINT_SIZES.lg}px and max-width: ${BREAKPOINT_SIZES.xl}px)`,
  xsAndSmaller: `(max-width: ${BREAKPOINT_SIZES.xs}px)`,
  smAndSmaller: `(max-width: ${BREAKPOINT_SIZES.sm}px)`,
  mdAndSmaller: `(max-width: ${BREAKPOINT_SIZES.md}px)`,
  lgAndSmaller: `(max-width: ${BREAKPOINT_SIZES.lg}px)`,
  xlAndSmaller: `(max-width: ${BREAKPOINT_SIZES.xl}px)`,
  xsAndLarger: `(min-width: ${BREAKPOINT_SIZES.xs + 1}px)`,
  smAndLarger: `(min-width: ${BREAKPOINT_SIZES.sm + 1}px)`,
  mdAndLarger: `(min-width: ${BREAKPOINT_SIZES.md + 1}px)`,
  lgAndLarger: `(min-width: ${BREAKPOINT_SIZES.lg + 1}px)`,
  xlAndLarger: `(min-width: ${BREAKPOINT_SIZES.xl + 1}px)`,
  mobile: `(max-width: ${BREAKPOINT_SIZES.md}px)`,
  desktop: `(min-width: ${BREAKPOINT_SIZES.md + 1}px)`,
};
export const THEME = {
  breakpoints: BREAKPOINTS,
  font: {
    light: "300",
    regular: "400",
    semibold: "500",
    bold: "700",
    xbold: "900",
  },
};
