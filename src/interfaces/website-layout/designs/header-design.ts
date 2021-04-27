// MAIN TYPES

type MAIN_ORDER_COMPONENTS = 'logo' | 'search' | 'icons';
type HEADER_MAIN_ORDER = MAIN_ORDER_COMPONENTS[];
type MAIN_STYLES = {
  backgroundColor: string;
};
export type HEADER_MAIN = {
  order: HEADER_MAIN_ORDER;
  styles: MAIN_STYLES;
};

// CATEGORY BAR TYPES
type CATEGORY_BAR_STYLES = {
  backgroundColor: string;
  textColor: string;
};
export type CATEGORY_BAR_CATEGORY = {
  id: number;
  name: string;
};
export type CATEGORY_BAR = {
  enabled: boolean;
  styles: CATEGORY_BAR_STYLES;
  categories: CATEGORY_BAR_CATEGORY[];
};

// Icons Types

export interface HEADER_DESIGN {
  id: number;
  main: HEADER_MAIN;
  categoryBar: CATEGORY_BAR;
  isSelected: boolean;
}
