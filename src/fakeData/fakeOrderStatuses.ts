import { ORDER_STATUS } from "../interfaces/orders/orders";

export const orderStatuses: ORDER_STATUS[] = [
  {
    id: 1,
    title: {
      ar: "بإنتظار التأكيد",
      en: "Pending Approval",
    },
  },
  {
    id: 2,
    title: {
      ar: "قيد التنفيذ",
      en: "Under Processing",
    },
  },

  {
    id: 3,
    title: {
      ar: "قيد التوصيل",
      en: "Out for Delivery",
    },
  },
  {
    id: 4,
    title: {
      ar: "تم التوصيل",
      en: "Delivered",
    },
  },
  {
    id: 5,
    title: {
      ar: "ملغى",
      en: "Cancelled",
    },
  },
];
