import axios, { AxiosRequestConfig } from "axios";
import { USER, LOGIN_FORM, LOGIN_RESPONSE } from "../interfaces/auth/auth";
import { CUSTOMER, NEW_CUSTOMER } from "../interfaces/customers/customers";
import { GET_GOOGLE_MAP_DATA, MapCoordinates } from "../interfaces/maps/maps";
import { GET_STORES_RESPONSE } from "../interfaces/stores/stores";
import { ORDER, ORDERS_FILTERS } from "../interfaces/orders/orders";
import { COUPON, NEW_COUPON } from "../interfaces/coupons/coupons";

import { NEW_STAFF_MEMBER, STAFF_MEMBER } from "../interfaces/staff/staff";

import { ORDER_SORT } from "../pages/Orders";
import { BRANCH, NEW_BRANCH } from "../interfaces/settings/branches/branches";
import { customerUri } from "../constants";

// export const customerUri = "https://o-now.herokuapp.com/customer-api";

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
export const getCoupons = async (
  sortBy: any,
  pageParam: number,
  limit?: number
) => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
    params: {
      limit: limit ?? 10,
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
export const getStaffMember = async (id: number) => {
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
  id: number
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
  const res = await axios.post(`${customerUri}/branches`, data, config);
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
