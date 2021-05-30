import { CATEGORY, MINI_CATEGORY } from "../categories/categories";

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
  short_description: {
    ar: string;
    en: string;
  };

  price: number;
  price_by_variations: boolean;
  variations_enabled: boolean;

  saleEnabled: boolean;
  salePrice?: string;
  saleEndDate: string;
  saleEndDateEnabled: boolean;
  priceFromVariations: boolean;
  productVariationsEnabled: boolean;
  allowSideNotes: boolean;
  maxQtyPerUser: number;
  image: File[];
  variations?: NEW_VARIATION[];
}
export type NEW_VARIATION = {
  type_id: number;
  select_type: number;
  title: string;
  title_ar: string;
  required: number;
  values: VARIATION_VALUE[];
};

export type VARIATION_VALUE = {
  name: string;
  name_ar: string;
  priceEnabled: boolean;
  saleEnabled: boolean;
  saleEndDateEnabled: boolean;
  price: string;
  sale_price: string;
  sale_end_date: string;
  color: string;
  qty: number;
  infiniteQtyEnabled: boolean;
  qtyAlertThreshold: number;
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
