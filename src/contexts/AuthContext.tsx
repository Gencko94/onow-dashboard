import { createContext } from "react";

import { useQuery, useQueryClient } from "react-query";

import { STORE, USER } from "../interfaces/auth/auth";
import { getUser } from "../utils/queries";

interface AuthContextProps {
  user?: USER | undefined;
  userStores: STORE[];
  logOut: () => void;
}

export const AuthProvider = createContext<Partial<AuthContextProps>>({
  user: undefined,
});

const AuthContext: React.FC = ({ children }) => {
  const queryClient = useQueryClient();
  const { data: user } = useQuery("auth", getUser, {
    suspense: true,
  });
  const logOut = () => {
    localStorage.removeItem("dshtid");
    queryClient.setQueryData("auth", undefined);
  };
  return (
    <AuthProvider.Provider
      value={{
        user: user,

        logOut,
      }}
    >
      {children}
    </AuthProvider.Provider>
  );
};

export default AuthContext;
