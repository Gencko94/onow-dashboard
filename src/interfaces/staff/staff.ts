export interface STAFF_MEMBER {
  name: string;
  email: string;
  phone: string;
  role: "SUPER_USER" | "ADMIN" | "STAFF";
  id: number;
  permissions: STAFF_PERMISSIONS;
}
export type STAFF_PERMISSIONS = string[];
export type CUSTOMERS_PERMISSIONS = [
  "createCustomer",
  "deleteCustomer",
  "editCustomer",
  "visitCustomers"
];
export type ORDERS_PERMISSIONS = [
  "createOrder",
  "deleteOrder",
  "editOrder",
  "visitOrders"
];
export type PRODUCTS_PERMISSIONS = [
  "createProduct",
  "deleteProduct",
  "editProduct",
  "hideProduct",
  "visitProducts"
];
export interface NEW_STAFF_MEMBER {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: "STAFF" | "ADMIN";
  permissions: STAFF_PERMISSIONS;
  branch_id: number;
}
