// type TYPES =
//   | "street_address"
//   | "route"
//   | "political"
//   | "country"
//   | "administrative_area_level_1"
//   | "administrative_area_level_2"
//   | "locality"
//   | "sublocality"
//   | "neighborhood";

export type MapCoordinates = {
  lat: number;
  lng: number;
};

export interface GoogleMapsResult {
  address_components: ADDRESS_COMPONENT[];
  formatted_address: string;
  types: string[];
}
export interface ADDRESS_COMPONENT {
  long_name: string;
  short_name: string;
  types: string[];
}

export type GET_GOOGLE_MAP_DATA = {};
