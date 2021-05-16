import { STAFF_MEMBER } from "../interfaces/staff/staff";

export const staff1: STAFF_MEMBER = {
  email: "test@test.com",
  name: "Test User",
  phone: "+9659795465",
  role: "Admin",
  id: 1,
  permissions: {
    customers: {
      createCustomer: true,
      deleteCustomer: true,
      editCustomer: false,
    },
    orders: {
      createOrder: false,
      deleteOrder: false,
      editOrder: true,
    },
    products: {
      createProduct: false,
      deleteProduct: true,
      editProduct: true,
      hideProduct: false,
    },
  },
};
export const staffMembers: STAFF_MEMBER[] = [staff1];
