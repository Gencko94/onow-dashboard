export type USER = {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  role: string;
};

export type LOGIN_FORM = {
  login: string;
  password: string;
};

export type LOGIN_RESPONSE = {
  result: {
    token: string;
    userInfo: {
      id: number;
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      refreshToken: string | null;
      // should add a role here
    };
    stores: {
      domain: string;
      duration: string;
      isActive: boolean;
      callService: null; // Should move this to store identity section
      contry: {
        // fix typo
        id: number;
        code: string;
        name: {
          [key: string]: string;
        };
        currency: {
          [key: string]: string;
        };
      };
      languages: {
        // what are these ??
        id: number;
        locale: {
          [key: string]: string;
        };
        name: {
          [key: string]: string;
        };
        rtl: boolean;
        active: boolean;
      }[];
    }[];
  };
};
