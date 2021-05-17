export type GET_STORES_RESPONSE = {
  id: number;
  domain: string;
  logo: string;
  name: {
    [key: string]: string;
  };
}[];
