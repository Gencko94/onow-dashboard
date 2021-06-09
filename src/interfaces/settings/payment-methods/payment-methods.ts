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
export interface CREATE_PAYMENT_GATEWAY {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  business_name: string;
  id_front_side: File;
  id_back_side: File;
  account_type: "individual" | "company";
  bank_iban: string;
  license_number: string;
  license_copy: File;
  authorized_signature: File;
}
