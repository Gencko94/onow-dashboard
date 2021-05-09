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
    name_en: string;
    name_ar: string;
    flag: string; // photo of the country flag;
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
