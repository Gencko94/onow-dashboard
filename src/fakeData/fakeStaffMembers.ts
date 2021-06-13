import { STAFF_MEMBER } from "../interfaces/staff/staff";

export const staff1: STAFF_MEMBER = {
  email: "test@test.com",
  name: "Test User",
  phone: "+9659795465",
  role: "admin",
  id: 1,
  permissions: {
    customers: {
      createCustomer: true,
      deleteCustomer: true,
      editCustomer: true,
      visitCustomers: true,
    },
    orders: {
      createOrder: false,
      deleteOrder: false,
      editOrder: true,
      visitOrders: true,
    },
    products: {
      createProduct: false,
      deleteProduct: true,
      editProduct: true,
      hideProduct: false,
      visitProducts: true,
    },
  },
};
export const staffMembers: STAFF_MEMBER[] = [staff1];
