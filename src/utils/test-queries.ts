import { miniCategories } from "../fakeData/fakeCategories";
import { coupon1 } from "../fakeData/fakeCoupons";
import { CUSTOMER1 } from "../fakeData/fakeCustomerData";
import { categories } from "../fakeData/fakeData";
import { newOrders, order1, storeOrders } from "../fakeData/fakeOrders";
import { product1, products } from "../fakeData/fakeProducts";
import { staff1, staffMembers } from "../fakeData/fakeStaffMembers";
import { MINI_CATEGORY } from "../interfaces/categories/categories";
import { COUPON } from "../interfaces/coupons/coupons";
import { CUSTOMER } from "../interfaces/customers/customers";
import { NEW_ORDERS } from "../interfaces/orders/new-orders";
import { ORDER, STORE_ORDERS } from "../interfaces/orders/orders";
import { PRODUCT } from "../interfaces/products/products";
import { STAFF_MEMBER } from "../interfaces/staff/staff";

export const getCategories = (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories);
    }, 500);
  });
};
export const searchProducts = (value: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (value === "test") {
        resolve([product1, product1]);
      } else {
        resolve([]);
      }
    }, 500);
  });
};
export const getSingleCustomer = (id: number): Promise<CUSTOMER> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (id === 1) {
        resolve(CUSTOMER1);
      }
    }, 500);
  });
};
export const getStoreOrders = (): Promise<STORE_ORDERS> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(storeOrders);
    }, 500);
  });
};
export const getOrderCustomer = (id: number): Promise<ORDER> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (id === 1) {
        resolve(order1);
      }
    }, 500);
  });
};
export const getNewOrders = (): Promise<NEW_ORDERS> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(newOrders);
    }, 500);
  });
};
export const getStoreStaffMembers = (): Promise<STAFF_MEMBER[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(staffMembers);
    }, 500);
  });
};
export const getStaffMember = (id: string): Promise<STAFF_MEMBER> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(staff1);
    }, 500);
  });
};
export const getMiniCategories = (): Promise<MINI_CATEGORY[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(miniCategories);
    }, 500);
  });
};
export const getProductsList = (): Promise<PRODUCT[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
};
export const getSingleProduct = (id: string): Promise<PRODUCT> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(product1);
    }, 500);
  });
};
export const getSingleCoupon = (id: string): Promise<COUPON> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === "1") {
        resolve(coupon1);
      } else {
        reject({ message: "Not Found" });
      }
    }, 500);
  });
};
