export type BRANCH_ADDRESS = {
  coords: {
    lat: string;
    lng: string;
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
export type WORKING_HOURS_ARRAY = {
  [key: string]: {
    enabled: boolean;
    from: string;
    to: string;
  };
}[];
export interface BRANCH {
  id: number;
  name: {
    [key: string]: string;
  };
  active: boolean;
  cod_enabled: boolean;
  cod_cost: number;
  busy: boolean;
  enable_pickup: boolean;
  delivery_enabled: boolean;
  address: BRANCH_ADDRESS;
  working_hours: WORKING_HOURS_ARRAY;
  contact_info: {
    landline: string;
    mobile: string;
    whatsapp: string;
  };
}
export type BRANCH_INFO = {
  name: {
    [key: string]: string;
  };
  active: boolean;
  cod_enabled: boolean;
  cod_cost: number;
  busy: boolean;
  enable_pickup: boolean;
  delivery_enabled: boolean;
  contact_info: {
    landline: string;
    mobile: string;
    whatsapp: string;
  };
};
export interface NEW_BRANCH {
  name: {
    [key: string]: string;
  };
  country_id: number;
  busy: boolean;
  active: 1 | 0;
  cod_enabled: boolean;
  enable_pickup: boolean;
  delivery_enabled: boolean;
  cod_cost: string;
  address: BRANCH_ADDRESS;
  working_hours: WORKING_HOURS;
  contact_info: {
    landline: string;
    mobile: string;
    whatsapp: string;
  };
}
