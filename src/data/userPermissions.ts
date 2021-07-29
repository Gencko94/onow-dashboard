import {
  CUSTOMERS_PERMISSIONS,
  ORDERS_PERMISSIONS,
  PERMISSIONS,
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
  // "deleteProduct",
  "editProduct",
  "visitProducts",
  "hideProduct",
];
export const staffPermissions: STAFF_PERMISSIONS = [
  "assignRole",
  "unassignRole",
  "viewAllPermissions",
  "viewAllRoles",
  "createUser",
  "deleteUser",
  "editUser",
  "visitUser",
];
export const userPermissions: PERMISSIONS = [
  ...ordersPermissions,
  ...customerPermissions,
  ...productPermissions,
];
