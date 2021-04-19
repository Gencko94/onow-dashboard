export type STATUS = '';

export interface ORDER_STATUS {
  status_id: number;
  title: {
    [key: string]: string;
  };
  value: number;
}
export const orderStatuses: ORDER_STATUS[] = [
  {
    status_id: 1,
    title: {
      ar: 'بإنتظار الدفع',
      en: 'Waiting For Payment',
    },
    value: 684,
  },
  {
    status_id: 2,
    title: {
      ar: 'بإنتظار المراجعة',
      en: 'Waiting for Review',
    },
    value: 320,
  },
  {
    status_id: 3,
    title: {
      ar: 'قيد التنفيذ',
      en: 'Under Processing',
    },
    value: 214,
  },
  {
    status_id: 4,
    title: {
      ar: 'تم التنفيذ',
      en: 'Processed',
    },
    value: 324,
  },
  {
    status_id: 5,
    title: {
      ar: 'قيد التوصيل',
      en: 'Delivering',
    },
    value: 32,
  },
  {
    status_id: 6,
    title: {
      ar: 'تم التوصيل',
      en: 'Delivered',
    },
    value: 42,
  },
  {
    status_id: 7,
    title: {
      ar: 'ملغى',
      en: 'Cancelled',
    },
    value: 78,
  },
];
export interface ORDER_ITEM {
  id: number;
  name: {
    [key: string]: string;
  };
  price: number;
  totalPrice: number;
  qty: number;
  image: string;
}
export const orderItems: ORDER_ITEM[] = [
  {
    id: 1,
    name: {
      ar: 'ساعة يد ماركة بولغاري',
      en: 'Bulgary Hand Watch',
    },
    price: 2,
    qty: 2,
    totalPrice: 4,
    image: '/images/product.webp',
  },
  {
    id: 2,
    name: {
      ar: 'ساعة يد ماركة بولغاري',
      en: 'Bulgary Hand Watch',
    },
    price: 2,
    qty: 2,
    totalPrice: 4,
    image: '/images/product.webp',
  },
];
