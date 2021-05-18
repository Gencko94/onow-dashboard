export interface GET_CUSTOMERS_RESPONSE {
  results: CUSTOMER[];
}

export interface NEW_CUSTOMER {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  country: string;
}

export interface CUSTOMER {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  joinDate: string;
  country: {
    id: number;
    name: {
      [key: string]: string;
    };
    currency: {
      [key: string]: string;
    };
    orders: [];
  };
  // orders: [
  //   {
  //     order_id: number;
  //     orderStatus: 'delivered' | 'waiting_for_payment'; // ... all other order statuses.
  //     order_items: []; // array of minimal products list;
  //     order_type: 'pickup' | 'delivery';
  //   }
  // ];
}
