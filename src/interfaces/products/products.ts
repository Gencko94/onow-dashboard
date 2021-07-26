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
  images: { id: number; image: string; link: string }[];
  description: {
    [key: string]: string;
  };

  price: number;
  price_by_options: boolean;
  options: PRODUCT_OPTION[];
  max_qty_per_user: number;

  prep_time: number;
  allow_side_notes: boolean;
  allow_attachments: boolean;
  branch_availability: {
    all: boolean;
    branches: number[];
  };
};
export type OPTION_VALUE = {
  id: number;
  name: {
    [key: string]: string;
  };
  price: string;
  quantity: number | null;
  sku: string;
};
export type PRODUCT_OPTION = {
  id: number;
  select_type: "single" | "multiple";
  max_picks: number | undefined;
  name: {
    [key: string]: string;
  };
  required: boolean;
  values: OPTION_VALUE[];
};
