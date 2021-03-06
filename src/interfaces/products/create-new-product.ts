export interface NEW_PRODUCT {
  name: {
    [key: string]: string;
  };
  active: 1 | 0;
  quantity: number | "unlimited";
  product_category_id: number;
  images: File[];
  thumbnail: File;
  description: {
    [key: string]: string;
  };
  sku: string;
  slug: string;
  price: number;
  price_by_options: boolean;

  prep_time: number;
  allow_side_notes: boolean;
  allow_attachments: boolean;
  max_qty_per_user: number;

  branch_availability: {
    all: boolean;
    branches: number[];
  };

  options: NEW_PRODUCT_OPTION[];
}
export type PRODUCT_PROMOTION = {
  type: "product_price" | "option_price";
  sale_price: string;
  sale_start_date: string;
  sale_end_date: string;
  values_skus: string[];
};
export type NEW_PRODUCT_OPTION = {
  select_type: "single" | "multiple";
  max_picks: number | undefined;
  name: {
    [key: string]: string;
  };
  required: boolean;
  values: NEW_OPTION_VALUE[];
};

export type NEW_OPTION_VALUE = {
  name: {
    [key: string]: string;
  };
  price: string;
  quantity: number;
  sku: string;
};
export interface NEW_PRODUCT_FORM_PROPS {
  category_id: number;
  name: {
    [key: string]: string;
  };

  images: File[];
  description: {
    [key: string]: string;
  };
  slug: string;
  max_qty_per_user: number;
  prep_time: {
    time: number;
    unit: string;
  };

  price: number;
  price_by_options: boolean;
  variations_enabled: boolean;
  allow_side_notes: boolean;
  allow_attachments: boolean;
  branch_availability: {
    all: boolean;
    branches: number[];
  };
  promotions: PRODUCT_PROMOTION;
  options: NEW_PRODUCT_OPTION[];
}
