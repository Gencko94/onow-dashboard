import axios from "axios";
import { LOGIN_FORM, LOGIN_RESPONSE, USER } from "../interfaces/auth/auth";

const uri = "https://develop.o-now.net/customer-api";

export const getUser = async (): Promise<USER> => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.get(`get-user`, config);
  console.log(res.data);
  return res.data.user;
};
export const userLogin = async (data: LOGIN_FORM): Promise<LOGIN_RESPONSE> => {
  const res = await axios.post(`login`, data);
  return res.data;
};
