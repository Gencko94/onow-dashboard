import { PRODUCT_OPTION } from "../products/create-new-product";

export interface EDIT_PRODUCT_GENERAL_INFO {
  name: {
    [key: string]: string;
  };
  description: {
    [key: string]: string;
  };
  slug: string;
  category_id: string[];
}
export interface EDIT_PRODUCT_PRICING_AND_OPTIONS {
  price: number;
  price_by_options: boolean;
  options: PRODUCT_OPTION[];
}
export interface EDIT_PRODUCT_ORDER_OPTIONS {
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
}
export interface ADD_PRODUCT_IMAGE {
  images: File[];
}
