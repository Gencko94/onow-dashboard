export type BRANCH_ADDRESS = {
  coords: {
    lat: number;
    lng: number;
  };
  address: {
    [key: string]: string;
  };
};
export type WORKING_HOURS = {
  saturday: {
    enabled: boolean;
    from: string;
    to: string;
  };
  sunday: {
    enabled: boolean;
    from: string;
    to: string;
  };
  monday: {
    enabled: boolean;
    from: string;
    to: string;
  };
  tuesday: {
    enabled: boolean;
    from: string;
    to: string;
  };
  wednesday: {
    enabled: boolean;
    from: string;
    to: string;
  };
  thursday: {
    enabled: boolean;
    from: string;
    to: string;
  };
  friday: {
    enabled: boolean;
    from: string;
    to: string;
  };
};
export interface BRANCH {
  id: number;
  name: {
    ar: string;
    en: string;
  };

  cod_enabled: boolean;
  cod_cost: string;
  pickup_enabled: boolean;
  delivery_enabled: boolean;
  address: BRANCH_ADDRESS;
  working_hours: WORKING_HOURS;
  contact_info: {
    landline: string;
    mobile: string;
    whatsapp: string;
  };
}
export interface NEW_BRANCH {
  name: {
    ar: string;
    en: string;
  };
  country: string;
  city: string;
  cod_enabled: boolean;
  pickup_enabled: boolean;
  delivery_enabled: boolean;
  cod_cost: number;
  address: BRANCH_ADDRESS;
  working_hours: WORKING_HOURS;
  contact_info: {
    landline: string;
    mobile: string;
    whatsapp: string;
  };
}
