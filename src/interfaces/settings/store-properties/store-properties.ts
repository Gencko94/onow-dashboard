export type STORE_NAME_AND_DESCRIPTION = {
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
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
export interface GET_STORE_INFORMATION {
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  // headquarters: STORE_HEADQUARTERS;
  phone: string;
  whatsapp: string;
  landline: string;
  email: string;
  instagram: string;
  twitter: string;
  facebook: string;
  snapchat: string;
}
