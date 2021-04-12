import axios from 'axios';
import { LOGIN_FORM, LOGIN_RESPONSE, USER } from '../interfaces/auth';

const uri = 'https://develop.o-now.net';

export const getUser = async (): Promise<USER> => {
  const t = localStorage.getItem('dshtid');
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : '',
    },
  };
  const res = await axios.get(`${uri}/user`, config);
  console.log(res.data);
  return res.data.user;
};
export const userLogin = async (data: LOGIN_FORM): Promise<LOGIN_RESPONSE> => {
  const res = await axios.post(`${uri}/customer-api/login`, data);

  return res.data;
};
