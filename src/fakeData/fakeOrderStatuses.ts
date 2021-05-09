import { ORDER_STATUS } from '../interfaces/orders/orders';

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
      ar: 'بانتظار الدفع عند الوصول',
      en: 'Waiting For Cash',
    },
    value: 684,
  },
  {
    status_id: 3,
    title: {
      ar: 'بإنتظار التأكيد',
      en: 'Pending Approval',
    },
    value: 320,
  },
  {
    status_id: 4,
    title: {
      ar: 'قيد التنفيذ',
      en: 'Under Processing',
    },
    value: 214,
  },

  {
    status_id: 5,
    title: {
      ar: 'قيد التوصيل',
      en: 'Out for Delivery',
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
