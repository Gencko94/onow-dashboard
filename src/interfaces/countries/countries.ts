export interface COUNTRY {
  country_id: number;
  call_code: string; //'+965'
  cities: CITY[];
  name: {
    [key: string]: string;
  };
}
export interface CITY {
  city_id: number;
  name: {
    [key: string]: string;
  };
}
