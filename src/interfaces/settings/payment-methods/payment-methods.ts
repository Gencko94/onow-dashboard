export type PAYMENT_GATEWAY = {
  name: {
    [key: string]: string;
  };
  logo: string;
  registration_link: string;
  info: {};
  supported_methods: PAYMENT_METHOD[];
};
export type PAYMENT_METHOD = {
  name: {
    [key: string]: string;
  };
  logo: string;
  settlementWindow: {
    [key: string]: string;
  };
  fee: {
    [key: string]: string;
  };
};
