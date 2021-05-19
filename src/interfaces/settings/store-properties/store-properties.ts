export type STORE_INFORMATION = {
  name: {
    en: string;
    ar: string;
  };
  description: string;
  headquarters: STORE_HEADQUARTERS;
};
export type STORE_HEADQUARTERS = {
  country: string;
  city: string;
  avenue: string;
  street: string;
  poAddress: string;
  buildingNo: string;
};

export type STORE_TECHNICAL_SUPPORT = {
  phone: string;
  whatsapp: string;
  landline: string;
  email: string;
};
export type STORE_SOCIAL_NETWORK = {
  instagram: string;
  twitter: string;
  facebook: string;
  snapchat: string;
};
