type GRID_COUNT = {
  small: number;
  medium: number;
  large: number;
};

type GRID_OPTIONS = {
  itemsPerRow: GRID_COUNT;
};

type CTA_STYLES = {
  backgroundColor: string;
  textColor: string;
};
type CTA_OPTIONS = {
  text: string;
  enabled: boolean;
  styles: CTA_STYLES;
};

export interface PRODUCT_GRID_DESIGN {
  id: number;
  title: string;
  isSelected: boolean;
  ctaOptions: CTA_OPTIONS;
  gridOptions: GRID_OPTIONS;
  type: string;
  products?: number[] | null;
  category?: number | null;
}
