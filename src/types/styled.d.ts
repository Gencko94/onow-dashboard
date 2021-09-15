// import original module declarations
import "styled-components";
import { Devices } from "../interfaces/breakpoints/breakpoints";

// and extend them!
type FontWeights = {
  light: string;
  regular: string;
  semibold: string;
  bold: string;
  xbold: string;
};
declare module "styled-components" {
  export interface DefaultTheme {
    fontFamily: string;
    breakpoints: Devices;
    background: string;
    subtleBackground: string;
    subtleFloating: string;
    sidebarBackground: string;
    sidebarSubtleBackground: string;
    shadow: string;
    errorShadow: string;
    stickyNav: string;
    green: string;
    font: FontWeights;
    dangerRed: string;
    border: string;
    borderDanger: string;
    maxWidthMd: string;
    maxWidthLg: string;
    borderHovered: string;
    // New Colors
    primary: string;
    secondary: string;
    primaryLighter: string;
    primaryDarker: string;
    text: string;
    textContrast: string;
    textAlt: string;
    textAltContrast: string;
    blue: string;
    yellow: string;

    // New Accents
    accent1: string;
    accent2: string;
    accent3: string;
  }
}
