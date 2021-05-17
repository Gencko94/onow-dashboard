import axios from "axios";
import {
  GET_USER_RESPONSE,
  LOGIN_FORM,
  LOGIN_RESPONSE,
} from "../interfaces/auth/auth";

const uri = "https://develop.o-now.net/customer-api";

export const getUser = async (): Promise<GET_USER_RESPONSE> => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.post(`/get-user`, {}, config);
  console.log(res.data);
  return res.data;
};
export const userLogin = async (data: LOGIN_FORM): Promise<LOGIN_RESPONSE> => {
  const res = await axios.post(`login`, data);
  return res.data;
};
