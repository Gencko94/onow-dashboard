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
  image: File[];
}
