import { NEW_ORDERS } from "../interfaces/orders/new-orders";
import { ORDER, STORE_ORDERS } from "../interfaces/orders/orders";

export const order1: ORDER = {
  order_id: 1,
  created_at: "2021-05-07T22:35:39.246Z",
  order_customer: {
    id: 1,
    first_name: "Ahmad",
    last_name: "Zaaza",
    phoneNumber: "+965978954",
  },
  payment_status: {
    status_id: 2,
    title: {
      en: "Paid",
      ar: "مدفوع",
    },
  },
  payment_type: "online",
  order_items: [
    {
      id: 1,
      name: {
        ar: "ساعة يد ماركة بولغاري",
        en: "Bulgary Hand Watch",
      },
      price: 2,
      qty: 2,
      totalPrice: 4,
      image: "/images/product.webp",
    },
  ],
  order_status: {
    status_id: 1,
    title: {
      ar: "بإنتظار التأكيد",
      en: "Pending Approval",
    },
  },
  order_type: "delivery",
  delivery_location: {
    block: "1",
    city: "Kuwait City",
    country_code: "+965",
    street: "So",
    floor: "1",
  },
};
export const storeOrders: STORE_ORDERS = {
  orders: [order1],
  stats: [
    {
      status_id: 1,
      title: {
        ar: "بإنتظار التأكيد",
        en: "Pending Approval",
      },
      value: 320,
    },
    {
      status_id: 2,
      title: {
        ar: "قيد التنفيذ",
        en: "Under Processing",
      },
      value: 214,
    },

    {
      status_id: 3,
      title: {
        ar: "قيد التوصيل",
        en: "Out for Delivery",
      },
      value: 32,
    },
    {
      status_id: 4,
      title: {
        ar: "تم التوصيل",
        en: "Delivered",
      },
      value: 42,
    },
    {
      status_id: 5,
      title: {
        ar: "ملغى",
        en: "Cancelled",
      },
      value: 78,
    },
  ],
};
export const newOrders: NEW_ORDERS = { orders: [order1] };
