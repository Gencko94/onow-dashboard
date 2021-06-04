import { MINI_CATEGORY } from "../categories/categories";

export type PRODUCTS_VIEW = "list" | "grid";
export type PRODUCT_TYPE = {
  id: number;
  name: string;
  description: {
    [key: string]: string;
  };
};
export type SALE_TYPES = "percent" | "fixed";
export interface NEW_PRODUCT {
  name: {
    ar: string;
    en: string;
  };
  category_id: number[];
  images: File[];
  description: {
    ar: string;
    en: string;
  };
  slug: string;
  price: number;
  price_by_variations: boolean;
  variations_enabled: boolean;
  prep_time: {
    time: number;
    unit: string;
  };
  saleEnabled: boolean;
  salePrice?: string;
  saleEndDate: string;
  saleEndDateEnabled: boolean;
  priceFromVariations: boolean;
  productVariationsEnabled: boolean;
  allow_side_notes: boolean;
  max_qty_per_user: number;
  availability: {
    all: boolean;
    branches: number[];
  };
  image: File[];
  variations: PRODUCT_OPTION[];
}
export type PRODUCT_OPTION = {
  type_id: number;
  select_type: "single" | "multiple";
  max_picks: number | undefined;
  name: {
    [key: string]: string;
  };
  required: boolean;
  values: VARIATION_VALUE[];
};

export type VARIATION_VALUE = {
  name: {
    [key: string]: string;
  };
  price: string;
  sale_price: string;
  sale_end_date: string;
  qty: number;
};

export type MINI_PRODUCT = {
  id: number;
  name: {
    [key: string]: string;
  };
  image: string;
  price: string;
};

interface PRODUCT_IMAGE {
  url: string;
  is_default: boolean;
}
export type PRODUCT = {
  id: number;
  name: {
    [key: string]: string;
  };
  slug: string;
  category: MINI_CATEGORY[];
  images: PRODUCT_IMAGE[];
  short_description: {
    ar: string;
    en: string;
  };

  price: number;
  price_by_variations: boolean;
  variations_enabled: boolean;
};
