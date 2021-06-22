import { STAFF_PERMISSIONS } from "../staff/staff";

export type USER = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  reset_token: string;
  email: string;
  store: STORE;
  permissions: STAFF_PERMISSIONS;
  role: "SUPER_USER" | "STAFF" | "ADMIN";
};

export type LOGIN_FORM = {
  login: string;
  password: string;
};
export type STORE = {
  id: number;
  domain: string;
  duration: string;
  logoUrl: string;
  storeName: {
    [key: string]: string;
  };
};

export type LOGIN_RESPONSE = {
  result: {
    token: string;
    userInfo: USER;
  };
};
