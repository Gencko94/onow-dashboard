import {
  CUSTOMERS_PERMISSIONS,
  ORDERS_PERMISSIONS,
  PRODUCTS_PERMISSIONS,
  STAFF_PERMISSIONS,
} from "../interfaces/staff/staff";

export const ordersPermissions: ORDERS_PERMISSIONS = [
  "createOrder",
  "deleteOrder",
  "editOrder",
  "visitOrders",
];
export const customerPermissions: CUSTOMERS_PERMISSIONS = [
  "createCustomer",
  "deleteCustomer",
  "editCustomer",
  "visitCustomers",
];
export const productPermissions: PRODUCTS_PERMISSIONS = [
  "createProduct",
  "deleteProduct",
  "editProduct",
  "hideProduct",
  "visitProducts",
];
export const userPermissions: STAFF_PERMISSIONS = [
  ...ordersPermissions,
  ...customerPermissions,
  ...productPermissions,
];
