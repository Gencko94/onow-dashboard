export interface NEW_CUSTOMER {
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
  country_id: number;
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
}
