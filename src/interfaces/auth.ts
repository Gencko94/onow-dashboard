export type USER = {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  role: string;
};

export type LOGIN_FORM = {
  login: string;
  password: string;
};

export type LOGIN_RESPONSE = {
  token?: string;
  message?: string;
  user?: USER;
};
