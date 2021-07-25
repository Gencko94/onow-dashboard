import { STAFF_MEMBER } from "../interfaces/staff/staff";

export const staff1: STAFF_MEMBER = {
  email: "test@test.com",
  first_name: "Test User",
  last_name: "Test User",
  phone: "+9659795465",
  role: "ADMIN",
  id: 1,
  permissions: [
    "assignRole",
    "unassignRole",
    "viewAllPermissions",
    "viewAllRoles",
    "createUser",
    "deleteUser",
    "editUser",
    "visitUser",
    "createUser",
    "createCustomer",
    "deleteCustomer",
    "editCustomer",
    "visitCustomers",
    "createProduct",
    "deleteProduct",
    "editProduct",
    "visitProducts",
    "hideProduct",
    "visitProducts",
    "createOrder",
    "deleteOrder",
    "editOrder",
    "visitOrders",
  ],
};
export const staffMembers: STAFF_MEMBER[] = [staff1];
