export interface COUPON {
  id: number;
  name: {
    [key: string]: string;
  };
  code: string;
  start_date: string;
  end_date: string;
  discount_type: string;
  free_delivery: string;
  amount: string;
  min_total_order: number;
  max_discount: number;
  total_uses: number;
  uses_per_user: number;
  enabled: boolean;
  coupon_coverage: number;
  special_products: number[];
  special_categories: number[];
}
export interface NEW_COUPON {
  name: {
    [key: string]: string;
  };
  start_date: string;
  end_date: string;
  code: string;

  discount_type: "fixed" | "percent";
  free_delivery: "0" | "1";
  amount: number;
  max_discount: string;
  min_total_order: string;
  total_uses: string | null;
  uses_per_user: string | null;
  enabled: boolean;
  coupon_coverage: number;
  special_products: number[];
  special_categories: number[];
}
