import { COUPON } from "../interfaces/coupons/coupons";

export const coupon1: COUPON = {
  amount: "1",
  code: "fdsa",
  coupon_coverage: 1,
  discount_type: "fixed",
  enabled: true,
  end_date: "11/2/2020",
  free_delivery: "0",
  id: 1,
  max_discount: 2,
  min_total_order: 1,
  name: {
    ar: "خصم",
    en: "Sale",
  },
  special_categories: [],
  special_products: [],
  total_uses: 1,
  uses_per_user: 1,
};
export const coupons: COUPON[] = [coupon1];
