export interface Sizes {
  xs: string;
  md: string;
  lg: string;
  xl: string;
}

export interface Devices {
  xs: string;
  md: string;
  lg: string;
  xl: string;
}
const size: Sizes = {
  xs: "320px",
  md: "768px",
  lg: "1100px",
  xl: "1366px",
};

export const devices: Devices = {
  xs: `(min-width: ${size.xs})`,
  md: `(min-width: ${size.md})`,
  lg: `(min-width: ${size.lg})`,
  xl: `(min-width: ${size.xl})`,
};
