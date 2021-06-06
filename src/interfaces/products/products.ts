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
