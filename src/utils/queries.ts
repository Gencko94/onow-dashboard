import axios from "axios";
import { USER, LOGIN_FORM, LOGIN_RESPONSE } from "../interfaces/auth/auth";
import { CUSTOMER, NEW_CUSTOMER } from "../interfaces/customers/customers";
import { GET_STORES_RESPONSE } from "../interfaces/stores/stores";

const uri = "https://develop.o-now.net/customer-api";

export const getUser = async (): Promise<USER> => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  // generate proper error message in bad http method
  const res = await axios.get(`/get-user`, config);

  return res.data.result.userInfo;
};
export const userLogin = async (data: LOGIN_FORM): Promise<LOGIN_RESPONSE> => {
  const res = await axios.post(`/login`, data);
  return res.data;
};
export const getUserStores = async (): Promise<GET_STORES_RESPONSE> => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.get(`/stores`, config);
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
  const res = await axios.get(`/clients-store`, config);
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
  const res = await axios.get(`/clients/${customerId}`, config);
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
  const res = await axios.post(`/clients`, data, config);
  return res.data.results;
};
