import { Redirect, Route } from "react-router-dom";

import { useContext } from "react";
import { AuthProvider } from "../../contexts/AuthContext";

interface IProps {
  path: string;
  Component: React.FC<{ storeId: number }>;
}

export default function ProtectedRoute({ Component, path }: IProps) {
  const { user } = useContext(AuthProvider);

  return (
    <Route
      exact
      path={path}
      render={({ location }) => {
        if (user) {
          return <Component storeId={user?.stores[0].id} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: `/`,
                state: location.pathname,
              }}
            />
          );
        }
      }}
    />
  );
}
