export interface Sizes {
  xs: string;
  md: string;
  lg: string;
}

export interface Devices {
  xs: string;
  md: string;
  lg: string;
}
const size: Sizes = {
  xs: '320px',
  md: '768px',
  lg: '1200px',
};

export const devices: Devices = {
  xs: `(min-width: ${size.xs})`,
  md: `(min-width: ${size.md})`,
  lg: `(min-width: ${size.lg})`,
};
