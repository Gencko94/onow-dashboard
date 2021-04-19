export interface COUPON {
  name: string;
  endDate: string;
  discountType: 'percent' | 'fixed';
  freeDeliveryEnabled: boolean;
  discountAmount: string;
  excludeDiscountedProducts: boolean;
  minTotalOrder: number;
  totalUses: number;
  usesPerUser: number;
}
