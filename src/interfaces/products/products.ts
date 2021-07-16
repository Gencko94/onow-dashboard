import { PRODUCT_OPTION } from "./create-new-product";

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
  active: boolean;
  quantity: number | "unlimited";
  name: {
    [key: string]: string;
  };

  sku: string;
  slug: string;
  category: {
    name: {
      [key: string]: string;
    };
    id: number;
  };
  image: string;
  images: PRODUCT_IMAGE[];
  description: {
    [key: string]: string;
  };

  price: number;
  price_by_options: boolean;
  options: PRODUCT_OPTION[];
  max_qty_per_user: number;
  prep_time: {
    time: number;
    unit: string;
  };
  allow_side_notes: boolean;
  allow_attachments: boolean;
  branch_availability: {
    all: boolean;
    branches: number[];
  };
};
