export type PRODUCTS_VIEW = 'list' | 'grid';
export type PRODUCT_TYPE = {
  id: number;
  name: string;
  description: {
    [key: string]: string;
  };
};
