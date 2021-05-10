import { ORDER_STATUS } from '../interfaces/orders/orders';

export const orderStatuses: ORDER_STATUS[] = [
  {
    status_id: 1,
    title: {
      ar: 'بإنتظار التأكيد',
      en: 'Pending Approval',
    },
  },
  {
    status_id: 2,
    title: {
      ar: 'قيد التنفيذ',
      en: 'Under Processing',
    },
  },

  {
    status_id: 3,
    title: {
      ar: 'قيد التوصيل',
      en: 'Out for Delivery',
    },
  },
  {
    status_id: 4,
    title: {
      ar: 'تم التوصيل',
      en: 'Delivered',
    },
  },
  {
    status_id: 5,
    title: {
      ar: 'ملغى',
      en: 'Cancelled',
    },
  },
];
