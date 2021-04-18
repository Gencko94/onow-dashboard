export type PRODUCTS_VIEW = 'list' | 'grid';
export type PRODUCT_TYPE = {
  id: number;
  name: string;
  description: {
    [key: string]: string;
  };
};
export type SALE_TYPES = 'percent' | 'fixed';
export interface NEW_PRODUCT {
  name: string;
  name_ar: string;
  shortDescriptionEn: string;
  shortDescriptionAr: string;
  longDescriptionEn?: string;
  longDescriptionAr?: string;
  productCategories: number[];
  price: string;
  saleEnabled: boolean;
  salePrice: string;
  saleEndDate: string;
  saleEndDateEnabled: boolean;
  priceFromVariations: boolean;
  productVariationsEnabled: boolean;
  image: File[];
}
export interface NEW_VARIATION {
  type_id: number;
  select_type: number;
  title: string;
  title_ar: string;
  values: VARIATION_VALUE[];
}

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
};
