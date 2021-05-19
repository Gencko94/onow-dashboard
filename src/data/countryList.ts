export type COUNTRY = {
  name: {
    [key: string]: string;
  };
  code: string;
};

export const countryList: COUNTRY[] = [
  {
    name: {
      ar: "الكويت",
      en: "Kuwait",
    },
    code: "+965",
  },
  {
    name: {
      ar: "السعودية",
      en: "Saudi Arabia",
    },
    code: "966",
  },
];
