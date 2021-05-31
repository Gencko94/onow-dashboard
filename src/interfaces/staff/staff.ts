export interface STAFF_MEMBER {
  name: string;
  email: string;
  phone: string;
  role: string;
  id: number;
  permissions: STAFF_PERMISSIONS;
}
export type STAFF_PERMISSIONS = {
  customers: CUSTOMERS_PERMISSIONS;
  orders: ORDERS_PERMISSIONS;
  products: PRODUCTS_PERMISSIONS;
};
export type CUSTOMERS_PERMISSIONS = {
  all: boolean;
  createCustomer: boolean;
  deleteCustomer: boolean;
  editCustomer: boolean;
};
export type ORDERS_PERMISSIONS = {
  all: boolean;
  createOrder: boolean;
  deleteOrder: boolean;
  editOrder: boolean;
};
export type PRODUCTS_PERMISSIONS = {
  all: boolean;
  createProduct: boolean;
  hideProduct: boolean;
  deleteProduct: boolean;
  editProduct: boolean;
};
