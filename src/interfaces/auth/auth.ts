export type USER = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  reset_token: string;
  email: string;
  stores: STORE[];
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
