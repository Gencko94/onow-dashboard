// import original module declarations
import "styled-components";
import { Devices } from "./breakpoints";

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
    mainColor: string | undefined;
    accentColor: string;
    highlightColor: string;
    highlightColorText: string;
    bodyColor: string;
    headingColor: string;
    subHeading: string;
    textColor: string;
    shadow: string;
    errorShadow: string;
    overlayColor: string;
    boxColor: string;
    btnPrimaryLight: string;
    btnPrimaryDark: string;
    inputColorLight: string;
    btnBorder: string;
    btnText: string;
    green: string;
    font: FontWeights;
    dangerRed: string;
    border: string;
    borderDanger: string;
    seperator: string;
    maxWidthMd: string;
    maxWidthLg: string;
    iconColor: string;
    mainGradient: string;
    borderHovered: string;

    // New Colors
    primary: string;
    primaryLighter: string;
    primaryDarker: string;
    textPrimary: string;
    textPrimaryContrast: string;
    textSecondary: string;
    textSecondaryContrast: string;
    blue: string;
    yellow: string;

    // New Accents
    accent1: string;
    accent2: string;
    accent3: string;
  }
}
