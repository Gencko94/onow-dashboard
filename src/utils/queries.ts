import axios from "axios";
import {
  GET_USER_RESPONSE,
  LOGIN_FORM,
  LOGIN_RESPONSE,
} from "../interfaces/auth/auth";
import { GET_STORES_RESPONSE } from "../interfaces/stores/stores";

const uri = "https://develop.o-now.net/customer-api";

export const getUser = async (): Promise<GET_USER_RESPONSE> => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.post(`get-user`, {}, config);

  return res.data;
};
export const userLogin = async (data: LOGIN_FORM): Promise<LOGIN_RESPONSE> => {
  const res = await axios.post(`login`, data);
  return res.data;
};
export const getUserStores = async (): Promise<GET_STORES_RESPONSE> => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.get(`stores`, config);
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
