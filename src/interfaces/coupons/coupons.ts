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
  couponCoverage: number;
  special_products: string[];
  special_categories: string[];
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
  amount: string;
  max_discount: string;
  min_total_order: string;
  total_uses: string;
  uses_per_user: string;
  enabled: boolean;
  coupon_coverage: number;
  special_products: string[];
  special_categories: string[];
}
