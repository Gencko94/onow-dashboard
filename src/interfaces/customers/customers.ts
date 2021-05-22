export interface NEW_CUSTOMER {
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
  country_id: number;
}

export interface CUSTOMER {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
  join_date: string;
  country: {
    id: number;
    country_code: string;
    name: {
      [key: string]: string;
    };
    currency: {
      [key: string]: string;
    };
    orders: [];
  };
}
