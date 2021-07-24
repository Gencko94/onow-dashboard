import axios, { AxiosRequestConfig } from "axios";
import { USER, LOGIN_FORM, LOGIN_RESPONSE } from "../interfaces/auth/auth";
import { CUSTOMER, NEW_CUSTOMER } from "../interfaces/customers/customers";
import { GET_GOOGLE_MAP_DATA, MapCoordinates } from "../interfaces/maps/maps";
import { GET_STORES_RESPONSE } from "../interfaces/stores/stores";
import { ORDER, ORDERS_FILTERS } from "../interfaces/orders/orders";
import { COUPON, NEW_COUPON } from "../interfaces/coupons/coupons";
import { NEW_PRODUCT } from "../interfaces/products/create-new-product";
import { PRODUCT } from "../interfaces/products/products";
import { NEW_STAFF_MEMBER, STAFF_MEMBER } from "../interfaces/staff/staff";
import {
  CATEGORY,
  EDIT_CATEGORY,
  NEW_CATEGORY,
} from "../interfaces/categories/categories";
import { ORDER_SORT } from "../pages/Orders";
import { BRANCH, NEW_BRANCH } from "../interfaces/settings/branches/branches";

export const customerUri = "https://new-version.o-now.net/customer-api";

export const getUser = async (): Promise<USER | undefined> => {
  const t = localStorage.getItem("dshtid");
  const instance = axios.create({
    validateStatus: (status) => {
      return status === 200 || status === 401;
    },
  });
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  // generate proper error message in bad http method
  const res = await instance.get(`${customerUri}/get-user`, config);
  if (res.data.result) {
    return res.data.result.userInfo;
  } else {
    return undefined;
  }
};

export const userLogin = async (data: LOGIN_FORM): Promise<LOGIN_RESPONSE> => {
  const res = await axios.post(`${customerUri}/login`, data);
  return res.data;
};
export const updateUserAccount = async (data: Partial<USER>): Promise<USER> => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.post(`${customerUri}/update-user`, data, config);
  return res.data.result.userInfo;
};
export const changeUserPassword = async ({
  current_password,
  password,
}: {
  current_password: string;
  password: string;
}) => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.post(
    `${customerUri}/update-user-password`,
    { current_password, password },
    config
  );
  return res.data.results;
};
export const getUserStores = async (): Promise<GET_STORES_RESPONSE> => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.get(`${customerUri}/stores`, config);
  const result = res.data.results.map((i: any) => ({
    id: i.id,
    domain: i.domain,
    logo: i.logo,
    name: {
      en: i.translations[0].name,
      ar: i.translations[1].name,
    },
  }));
  return result;
};

export const getCustomers = async (pageParam: number, search?: string) => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",

      params: {
        pageParam,
        search,
      },
    },
  };
  const res = await axios.get(`${customerUri}/clients`, config);
  return {
    data: res.data.results.data,
    lastPage: res.data.results.pagination.last,
    currentPage: res.data.results.pagination.current,
  };
};

export const getSingleCustomer = async (
  customerId: string
): Promise<CUSTOMER> => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.get(`${customerUri}/clients/${customerId}`, config);
  return res.data.results;
};
export const createCustomer = async (data: NEW_CUSTOMER): Promise<CUSTOMER> => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.post(`${customerUri}/clients`, data, config);
  return res.data.results;
};
export const editCustomer = async (customer: CUSTOMER): Promise<CUSTOMER> => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/clients/${customer.id}`,
    {
      first_name: customer.first_name,
      last_name: customer.last_name,
      phone: customer.phone,
      email: customer.email,
    },
    config
  );
  return res.data.results;
};
export const deleteCustomer = async (
  id: number
): Promise<{ message: string }> => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.delete(`${customerUri}/clients/${id}`, config);
  return res.data.results;
};
export const deleteMultipleCustomers = async (
  ids: number[]
): Promise<{ message: string }> => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/delete-multi-clients`,
    { clientsIds: ids },
    config
  );
  return res.data.results;
};
// End of Customers
//  Google Maps

export const getGoogleMapsLocation = async ({
  coords,
  language,
}: {
  coords: MapCoordinates;
  language: string;
}): Promise<GET_GOOGLE_MAP_DATA> => {
  const res = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=${language}`
  );
  // console.log(res.data);
  return res.data;
};

// Orders
type GET_ORDERS_REQUEST = {
  filters: ORDERS_FILTERS;
  pageParam: number;
};
export const getOrders = async ({ filters, pageParam }: GET_ORDERS_REQUEST) => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
    params: {
      page: pageParam,
      limit: 1,
    },
  };
  const res = await axios.get(`${customerUri}/get-orders`, config);
  return {
    orders: res.data.results.orders.data,
    lastPage: res.data.results.orders.pagination.last,
    currentPage: res.data.results.orders.pagination.current,
    stats: res.data.results.stats,
  };
};

export const getOrder = async (id: string): Promise<ORDER> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.get(`${customerUri}/orders/${id}`, config);
  return res.data.results;
};
type GET_ORDERS_BY_CUSTOMER_REQUEST = {
  sortBy: ORDER_SORT;
  pageParam: number;
  customerId: number;
  limit?: number;
};
export const getOrdersByCustomer = async ({
  sortBy,
  pageParam,
  customerId,
  limit = 20,
}: GET_ORDERS_BY_CUSTOMER_REQUEST) => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
    params: {
      page: pageParam,
      limit,
    },
  };
  const res = await axios.get(
    `${customerUri}/orders-client/${customerId}`,
    config
  );
  return {
    orders: res.data.results.data,
    lastPage: res.data.results.pagination.last,
    currentPage: res.data.results.pagination.current,
  };
};
// End of orders
export const getCoupon = async (id: string): Promise<COUPON> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.get(`${customerUri}/coupons/${id}`, config);
  return res.data.results;
};
export const getCoupons = async (sortBy: any, pageParam: number) => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
    params: {
      limit: 20,
      page: pageParam,
    },
  };
  const res = await axios.get(`${customerUri}/coupons`, config);
  return {
    data: res.data.results.data,
    currentPage: res.data.results.pagination.current,
    lastPage: res.data.results.pagination.last,
  };
};
export const createCoupon = async (coupon: NEW_COUPON): Promise<COUPON[]> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.post(`${customerUri}/coupons`, coupon, config);
  return res.data.results;
};
export const editCoupon = async (coupon: COUPON): Promise<COUPON[]> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/coupons/${coupon.id}`,
    coupon,
    config
  );
  return res.data.results;
};
export const deleteCoupon = async (
  id: string
): Promise<{ results: "Deleted" }> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.delete(`${customerUri}/coupons/${id}`, config);
  return res.data.results;
};
export const deleteMultipleCoupons = async (
  ids: number[]
): Promise<{ results: "Deleted" }> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/delete-multi-coupons`,
    { ids },
    config
  );
  return res.data.results;
};

//Products
//Get

export const getProducts = async (
  sortBy: {
    field: string;
    order: string;
  },
  pageParam: number,
  search?: string
) => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
    params: {
      sort: sortBy.order,
      field: sortBy.field,
      page: pageParam,
      limit: 20,
      search,
    },
  };
  const res = await axios.get(`${customerUri}/products`, config);
  return {
    data: res.data.results.data,
    lastPage: res.data.results.pagination.last,
    currentPage: res.data.results.pagination.current,
  };
};
export const getProduct = async (id: string): Promise<PRODUCT> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.get(`${customerUri}/products/${id}`, config);
  return res.data.results;
};
//Create
export const createProduct = async (product: NEW_PRODUCT) => {
  const t = localStorage.getItem("dshtid");
  console.log(product);
  const formData = new FormData();
  // Appending Form Data
  formData.append("name", JSON.stringify(product.name));
  product.images.forEach((image) => formData.append("images[]", image));
  if (product.thumbnail) {
    formData.append("thumbnail", product.thumbnail);
  }
  formData.append("description", JSON.stringify(product.description));
  formData.append("price", product.price as any);
  formData.append("price_by_options", JSON.stringify(product.price_by_options));
  formData.append("sku", product.sku);
  if (product.prep_time) {
    formData.append("prep_time", product.prep_time as any);
  }
  formData.append("allow_side_notes", JSON.stringify(product.allow_side_notes));
  formData.append(
    "allow_attachments",
    JSON.stringify(product.allow_attachments)
  );
  formData.append("max_qty_per_user", JSON.stringify(product.max_qty_per_user));
  formData.append(
    "branch_availability",
    JSON.stringify(product.branch_availability)
  );
  formData.append("options", JSON.stringify(product.options));
  if (product.quantity) {
    formData.append("quantity", JSON.stringify(product.quantity) as any);
  }
  formData.append("product_category_id", product.product_category_id as any);
  formData.append("active", product.active as any);
  formData.append("slug", JSON.stringify(product.slug));

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
      "Content-Type": "multipart/form-data",
    },
  };
  const res = await axios.post(`${customerUri}/products`, formData, config);
  return res.data.results;
};

// Add Product Option
export const addProductOption = async ({
  productId,
  option,
}: {
  productId: number;
  option: any;
}) => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.post(
    `${customerUri}/products/${productId}/option`,
    option,
    config
  );
  return res.data.results;
};
// Add Product Option Value
export const addProductOptionValue = async ({
  productId,
  optionId,
  value,
}: {
  productId: number;
  optionId: number;
  value: any;
}) => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.post(
    `${customerUri}/products/${productId}/option/${optionId}`,
    value,
    config
  );
  return res.data.results;
};
// Edit Product Option
export const editProductOption = async ({
  productId,
  optionId,
  option,
}: {
  productId: number;
  optionId: number;
  option: any;
}) => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/products/${productId}/option/${optionId}`,
    option,
    config
  );
  return res.data.results;
};
// Edit Product Option Value
export const editProductOptionValue = async ({
  productId,
  optionId,
  valueId,
  value,
}: {
  productId: number;
  optionId: number;
  valueId: number;
  value: any;
}) => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/products/${productId}/option/${optionId}/${valueId}`,
    value,
    config
  );
  return res.data.results;
};
// Delete Product Option
export const deleteProductOption = async ({
  productId,
  optionId,
}: {
  productId: number;
  optionId: number;
}) => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.delete(
    `${customerUri}/products/${productId}/option/${optionId}`,

    config
  );
  return res.data.results;
};
// Delete Product Option Value
export const deleteProductOptionValue = async ({
  productId,
  optionId,
  valueId,
}: {
  productId: number;
  optionId: number;
  valueId: number;
}) => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.delete(
    `${customerUri}/products/${productId}/option/${optionId}/${valueId}`,

    config
  );
  return res.data.results;
};
//Activation
export const activateProduct = async ({
  id,
  active,
}: {
  id: number;
  active: number;
}): Promise<{ results: "Deleted" }> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/activate-product/${id}`,
    { active },
    config
  );
  return res.data.results;
};
export const deleteProduct = async (
  id: string
): Promise<{ results: "Deleted" }> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.delete(`${customerUri}/products/${id}`, config);
  return res.data.results;
};
//Delete Multiple
export const deleteMultipleProducts = async (
  ids: number[]
): Promise<{ results: "Deleted" }> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/delete-multi-products`,
    { productIds: ids },
    config
  );
  return res.data.results;
};
// Search for products
export const searchProducts = async (search: string, pageParam: number) => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
    params: {
      search,
      pageParam,
    },
  };
  const res = await axios.get(`${customerUri}/products`, config);
  return {
    data: res.data.results.data,
    lastPage: res.data.results.pagination.last,
    currentPage: res.data.results.pagination.current,
  };
};
//Staff Members

export const getStaffMembers = async () => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.get(`${customerUri}/staff-users`, config);
  return res.data.results;
};
export const getStaffMember = async (id: string) => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.get(`${customerUri}/staff-users/${id}`, config);
  return res.data.results;
};
export const createStaffMember = async (staff: NEW_STAFF_MEMBER) => {
  const t = localStorage.getItem("dshtid");
  console.log(staff, "New Staff");

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.post(
    `${customerUri}/staff-users`,
    { ...staff, country_id: 2, branch_id: 3 },
    config
  );
  return res.data.results;
};
export const editStaffMember = async (staff: STAFF_MEMBER) => {
  const t = localStorage.getItem("dshtid");

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/staff-users/${staff.id}`,
    { ...staff, country_id: 2, branch_id: 3 },
    config
  );
  return res.data.results;
};
export const deleteStaffMember = async (
  id: string
): Promise<{ results: "Deleted" }> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.delete(`${customerUri}/staff-users/${id}`, config);
  return res.data.results;
};
// End of Staff members

//Categories

export const getCategories = async (pageParam: number, limit?: number) => {
  const t = localStorage.getItem("dshtid");

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
    params: {
      limit: limit ?? 20,
      page: pageParam,
    },
  };
  const res = await axios.get(`${customerUri}/product-categories`, config);
  return {
    data: res.data.results.data,
    currentPage: res.data.results.pagination.current,
    lastPage: res.data.results.pagination.last,
  };
};
export const getCategory = async (id: string): Promise<CATEGORY> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.get(
    `${customerUri}/product-categories/${id}`,
    config
  );
  return res.data.results;
};
export const activateCategory = async ({
  id,
  active,
}: {
  id: number;
  active: number;
}): Promise<{ results: "Deleted" }> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/activate-category/${id}`,
    { active },
    config
  );
  return res.data.results;
};
//Create Category

export const createCategory = async (
  category: NEW_CATEGORY
): Promise<CATEGORY> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
      "Content-Type": "multipart/form-data",
    },
  };
  const formData = new FormData();
  formData.append("active", category.active as any);
  formData.append("name", JSON.stringify(category.name));
  formData.append("description", JSON.stringify(category.description));
  if (category.image) {
    formData.append("image", category.image);
  }
  if (category.parent_id) {
    formData.append("parent_id", JSON.stringify(category.parent_id));
  }
  formData.append("slug", category.slug);
  const res = await axios.post(
    `${customerUri}/product-categories`,
    formData,
    config
  );
  return res.data.results;
};
// Edit Category

export const editCategory = async (category: EDIT_CATEGORY) => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/product-categories/${category.id}`,
    { ...category, seo_description: "1" },
    config
  );
  return res.data.results;
};
//Edit category image

// Remove Category Image
export const removeCategoryImage = async (id: number) => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };

  const res = await axios.get(
    `${customerUri}/product-categories-remove-image/${id}`,

    config
  );
  return res.data.results;
};
// Delete Category
export const deleteCategory = async (
  id: string
): Promise<{ results: "Deleted" }> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.delete(
    `${customerUri}/product-categories/${id}`,
    config
  );
  return res.data.results;
};
// Delete Multiple Categories
export const deleteMultipleCategories = async (
  ids: number[]
): Promise<{ results: "Deleted" }> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/delete-multi-product-categories`,
    { ids },
    config
  );
  return res.data.results;
};

// Branches

export const getBranches = async (pageParam: number, limit?: number) => {
  const t = localStorage.getItem("dshtid");

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
    params: {
      limit: limit ?? 20,
      page: pageParam,
    },
  };
  const res = await axios.get(`${customerUri}/branches`, config);
  return {
    data: res.data.results.data,
    currentPage: res.data.results.pagination.current,
    lastPage: res.data.results.pagination.last,
  };
};
export const getBranch = async (id: string): Promise<BRANCH> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.get(`${customerUri}/branches/${id}`, config);
  return res.data.results;
};
export const createBranch = async (data: NEW_BRANCH): Promise<BRANCH> => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.post(`${customerUri}/pickups`, data, config);
  return res.data.results;
};
export const editBranch = async (branch: BRANCH) => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.post(
    `${customerUri}/pickups/${branch.id}`,
    branch,
    config
  );
  return res.data.results;
};
