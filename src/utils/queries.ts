import axios, { AxiosRequestConfig } from "axios";
import { USER, LOGIN_FORM, LOGIN_RESPONSE } from "../interfaces/auth/auth";
import { CUSTOMER, NEW_CUSTOMER } from "../interfaces/customers/customers";
import { GET_GOOGLE_MAP_DATA, MapCoordinates } from "../interfaces/maps/maps";
import { GET_STORES_RESPONSE } from "../interfaces/stores/stores";
import {
  GET_ORDERS_RESPONSE,
  ORDER,
  ORDERS_FILTERS,
} from "../interfaces/orders/orders";
import { COUPON, NEW_COUPON } from "../interfaces/coupons/coupons";
import { NEW_PRODUCT } from "../interfaces/products/create-new-product";
import { PRODUCT } from "../interfaces/products/products";
import { NEW_STAFF_MEMBER, STAFF_MEMBER } from "../interfaces/staff/staff";

const uri = "https://new-version.o-now.net/customer-api";

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
  const res = await instance.get(`${uri}/get-user`, config);
  if (res.data.result) {
    return res.data.result.userInfo;
  } else {
    return undefined;
  }
};
export const userLogin = async (data: LOGIN_FORM): Promise<LOGIN_RESPONSE> => {
  const res = await axios.post(`${uri}/login`, data);
  return res.data;
};
export const updateUserAccount = async (user: USER) => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.post(
    `${uri}/update-user/${user.id}`,
    {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      phone: user.phone,
      country_id: 1,
    },
    config
  );
  return res.data.results;
};
export const changeUserPassword = async ({
  userId,
  current_password,
  password,
}: {
  userId: number;
  current_password: string;
  password: string;
}) => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
    params: { current_password, password },
  };
  const res = await axios.post(
    `${uri}/update-user-password/${userId}`,
    {},
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
  const res = await axios.get(`${uri}/stores`, config);
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

export const getCustomers = async (storeId: number): Promise<CUSTOMER[]> => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
      StoreId: storeId,
    },
  };
  const res = await axios.get(`${uri}/clients-store`, config);
  return res.data.results;
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
  const res = await axios.get(`${uri}/clients/${customerId}`, config);
  return res.data.results;
};
export const createCustomer = async ({
  storeId,
  data,
}: {
  storeId: number;
  data: NEW_CUSTOMER;
}): Promise<CUSTOMER> => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
      StoreId: storeId,
    },
  };
  const res = await axios.post(`${uri}/clients`, data, config);
  return res.data.results;
};

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
  return res.data;
};

// Orders
type GET_ORDERS_REQUEST = {
  storeId: number;
  filters: ORDERS_FILTERS;
};
export const getOrders = async ({
  storeId,
  filters,
}: GET_ORDERS_REQUEST): Promise<GET_ORDERS_RESPONSE> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
      StoreId: storeId,
    },
    // params: filters,
  };
  const res = await axios.get(`${uri}/get-orders`, config);
  return res.data.results;
};

export const getOrder = async (id: string): Promise<ORDER> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
      StoreId: 1,
    },
  };
  const res = await axios.get(`${uri}/orders/${id}`, config);
  return res.data.results;
};

// End of orders
export const getCoupon = async (id: string): Promise<COUPON> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.get(`${uri}/coupons/${id}`, config);
  return res.data.results;
};
export const getCoupons = async (sortBy: any): Promise<COUPON[]> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
    // params: sortBy,
  };
  const res = await axios.get(`${uri}/coupons`, config);
  return res.data.results;
};
export const createCoupon = async (coupon: NEW_COUPON): Promise<COUPON[]> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.post(`${uri}/coupons`, coupon, config);
  return res.data.results;
};
export const editCoupon = async (coupon: any): Promise<COUPON[]> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(`${uri}/coupons/${coupon.id}`, coupon, config);
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
  const res = await axios.delete(`${uri}/coupons/${id}`, config);
  return res.data.results;
};

//Products
//Get

export const getProducts = async (
  sortBy: {
    field: string;
    order: string;
  },
  pageParam: number
) => {
  console.log(pageParam);
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
    },
  };
  const res = await axios.get(`${uri}/products`, config);
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
  const res = await axios.get(`${uri}/products/${id}`, config);
  return res.data.results;
};
//Create
export const createProduct = async (product: NEW_PRODUCT) => {
  const t = localStorage.getItem("dshtid");
  console.log(product);
  // const formData = new FormData();
  // formData.append("file", product.images[0]);
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
      // "Content-Type": "multipart/form-data",
    },
  };
  const res = await axios.post(`${uri}/products`, product, config);
  return res.data.results;
};
//Delete
export const deleteProduct = async (
  id: string
): Promise<{ results: "Deleted" }> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.delete(`${uri}/products/${id}`, config);
  return res.data.results;
};

//Staff Members

export const getStaffMembers = async () => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.get(`${uri}/staff-users`, config);
  return res.data.results;
};
export const getStaffMember = async (id: string) => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.get(`${uri}/staff-users/${id}`, config);
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
    `${uri}/staff-users`,
    { ...staff, country_id: 2, branch_id: 3 },
    config
  );
  return res.data.results;
};
export const editStaffMember = async (staff: STAFF_MEMBER) => {
  const t = localStorage.getItem("dshtid");
  console.log(staff, "Edited Staff");

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${uri}/staff-users/${staff.id}`,
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
  const res = await axios.delete(`${uri}/staff-users/${id}`, config);
  return res.data.results;
};
// End of Staff members
