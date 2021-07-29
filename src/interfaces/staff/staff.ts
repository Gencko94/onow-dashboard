export interface STAFF_MEMBER {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: "SUPER_USER" | "ADMIN" | "STAFF";
  id: number;
  permissions: PERMISSIONS;
}
export type PERMISSIONS = string[];
export type STAFF_PERMISSIONS = [
  "assignRole", //
  "unassignRole", //
  "viewAllPermissions", //
  "viewAllRoles", //
  "createUser", //
  "deleteUser", //
  "editUser", //
  "visitUser" //
];
export type CUSTOMERS_PERMISSIONS = [
  "createCustomer", //
  "deleteCustomer", //
  "editCustomer", //
  "visitCustomers" //
];
export type ORDERS_PERMISSIONS = [
  "createOrder", //
  "deleteOrder", //
  "editOrder", //
  "visitOrders" //
];
export type PRODUCTS_PERMISSIONS = [
  "createProduct", //
  // "deleteProduct",
  "editProduct", //

  "visitProducts", //
  "hideProduct" //
];

export interface NEW_STAFF_MEMBER {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
  roles: "STAFF" | "ADMIN";
  permissions: PERMISSIONS;
  branches: number[];
}
