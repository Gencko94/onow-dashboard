export type STATUS = "";
export type GET_ORDERS_RESPONSE = {
  orders: ORDER[];
  stats: STORE_ORDERS_STAT[];
};
type ORDER_CUSTOMER = {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  phoneNumber: string;
};
type ORDER_DELIVERY_LOCATION = {
  country_code: string;
  block: string;
  street: string;
  floor?: string;
  avenue?: string;
  city: string;
  special_directions?: string;
};
export interface ORDER {
  order_id: number;
  order_customer: ORDER_CUSTOMER;
  order_status: ORDER_STATUS;
  order_type: "delivery" | "pickup";
  payment_type: "cash" | "online";
  payment_status: PAYMENT_STATUS;
  order_items: ORDER_ITEM[];
  coupon?: {
    code: string;
    amount: string;
  };
  delivery_location?: ORDER_DELIVERY_LOCATION;
  pickup_branch?: string;
  created_at: string;
}
export interface ORDER_STATUS {
  id: number;
  title: {
    [key: string]: string;
  };
}
export interface PAYMENT_STATUS {
  id: number;
  title: {
    [key: string]: string;
  };
}

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
      ar: "ساعة يد ماركة بولغاري",
      en: "Bulgary Hand Watch",
    },
    price: 2,
    qty: 2,
    totalPrice: 4,
    image: "/images/product.webp",
  },
  {
    id: 2,
    name: {
      ar: "ساعة يد ماركة بولغاري",
      en: "Bulgary Hand Watch",
    },
    price: 2,
    qty: 2,
    totalPrice: 4,
    image: "/images/product.webp",
  },
];
export type STORE_ORDERS_STAT = {
  id: number;
  title: {
    [key: string]: string;
  };
  value: number;
};

export interface STORE_ORDERS {
  orders: ORDER[];
  stats: STORE_ORDERS_STAT[];
}
export interface ORDERS_FILTERS {
  orderStatus: number | null;
  paymentType: "cash" | "online" | null;
  paymentStatus: number | null;
  orderMode: "delivery" | "pickup" | null;
  orderAmount: {
    from: number | "";
    to: number | "";
  };
  orderDate: {
    from: Date | "";
    to: Date | "";
  };
}
