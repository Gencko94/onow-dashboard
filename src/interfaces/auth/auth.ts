import { PERMISSIONS } from "../staff/staff";

export type USER = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  reset_token: string;
  email: string;
  store: STORE;
  permissions: PERMISSIONS;
  roles: "SUPER_USER" | "STAFF" | "ADMIN";
};

export type LOGIN_FORM = {
  login: string;
  password: string;
};
export type STORE = {
  id: number;
  domain: string;
  duration: string;
  logo: string;
  favicon: string;
  name: {
    [key: string]: string;
  };
  maintenance: boolean;
};

export type LOGIN_RESPONSE = {
  result: {
    token: string;
    userInfo: USER;
  };
};
export type INIT = {
  user: USER;
  store: STORE;
};
