export interface COUPON {
  id: number;
  name: string;
  code: string;
  end_date: string;
  discount_type: string;
  free_delivery: string;
  amount: string;
  min_total_order: number;
  max_discount: number;
  total_uses: number;
  uses_per_user: number;
  enabled: boolean;
  coupon_coverage: string;
  covered_data: string[] | [];
}
export interface NEW_COUPON {
  name: string;
  end_date: string;
  code: string;
  discount_type: string;
  free_delivery: boolean;
  amount: string;
  max_discount: number;
  min_total_order: number;
  total_uses: number;
  uses_per_user: number;
  enabled: boolean;
  coupon_coverage: string;
  covered_data: string[] | [];
}
