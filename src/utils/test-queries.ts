import { miniCategories } from "../fakeData/fakeCategories";
import { CUSTOMER1 } from "../fakeData/fakeCustomerData";
import {
  categories,
  footerDesign1,
  footerDesigns,
  headerDesign1,
  headerDesign2,
  headerDesigns,
  productGridDesign1,
  productGridDesigns,
  product1,
  productGridDesign2,
  products,
} from "../fakeData/fakeData";
import { newOrders, order1, storeOrders } from "../fakeData/fakeOrders";
import { staff1, staffMembers } from "../fakeData/fakeStaffMembers";
import { MINI_CATEGORY } from "../interfaces/categories/categories";
import { CUSTOMER } from "../interfaces/customers/customers";
import { NEW_ORDERS } from "../interfaces/orders/new-orders";
import { ORDER, STORE_ORDERS } from "../interfaces/orders/orders";
import { PRODUCT } from "../interfaces/products/products";
import { STAFF_MEMBER } from "../interfaces/staff/staff";
import { FOOTER_DESIGN } from "../interfaces/website-layout/designs/footer-design";
import { HEADER_DESIGN } from "../interfaces/website-layout/designs/header-design";
import { PRODUCT_GRID_DESIGN } from "../interfaces/website-layout/designs/product-grid-design";

export const getBlockDesigns = (type: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (type === "header") {
        resolve(headerDesigns);
      } else if (type === "footer") {
        resolve(footerDesigns);
      } else if (type === "product-grid") {
        resolve(productGridDesigns);
      }
    }, 500);
  });
};
export const getHeaderDesign = (id: string): Promise<HEADER_DESIGN> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (id === "1") {
        resolve(headerDesign1);
      } else if (id === "2") {
        resolve(headerDesign2);
      }
    }, 500);
  });
};
export const getFooterDesign = (id: string): Promise<FOOTER_DESIGN> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (id === "1") {
        resolve(footerDesign1);
      }
    }, 500);
  });
};
export const getProductGridDesign = (
  id: string
): Promise<PRODUCT_GRID_DESIGN> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (id === "1") {
        resolve(productGridDesign1);
      } else if (id === "2") {
        resolve(productGridDesign2);
      }
    }, 500);
  });
};
export const getCategories = (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories);
    }, 500);
  });
};
export const searchProducts = (value: string): Promise<any> => {
  console.log(value);
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
