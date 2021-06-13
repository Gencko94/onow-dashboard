export interface STAFF_MEMBER {
  name: string;
  email: string;
  phone: string;
  role: "super_user" | "admin" | "staff";
  id: number;
  permissions: STAFF_PERMISSIONS;
}
export type STAFF_PERMISSIONS = {
  customers: CUSTOMERS_PERMISSIONS;
  orders: ORDERS_PERMISSIONS;
  products: PRODUCTS_PERMISSIONS;
};
export type CUSTOMERS_PERMISSIONS = {
  createCustomer: boolean;
  deleteCustomer: boolean;
  editCustomer: boolean;
  visitCustomers: boolean;
};
export type ORDERS_PERMISSIONS = {
  createOrder: boolean;
  deleteOrder: boolean;
  editOrder: boolean;
  visitOrders: boolean;
};
export type PRODUCTS_PERMISSIONS = {
  createProduct: boolean;
  hideProduct: boolean;
  deleteProduct: boolean;
  editProduct: boolean;
  visitProducts: boolean;
};
export interface NEW_STAFF_MEMBER {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: "staff" | "admin";
  permissions: STAFF_PERMISSIONS;
  branch_id: number;
}
