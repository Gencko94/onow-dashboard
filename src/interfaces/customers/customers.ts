export interface NEW_CUSTOMER {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}

export type CUSTOMER = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
  join_date: string;
};
