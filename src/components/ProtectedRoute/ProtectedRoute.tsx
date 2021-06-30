import { Redirect, Route } from "react-router-dom";

import { useContext } from "react";
import { AuthProvider } from "../../contexts/AuthContext";
import { QueryErrorResetBoundary } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import canVisitPage from "../../utils/canVisitPage";
import NotAuthorized from "../../pages/NotAuthorized";
import ErrorBoundaryComponent from "../reusable/ErrorBoundaryComponent";

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
        // Check if authentication is successful.
        if (user) {
          // If Successful , check user permissions.
          if (
            canVisitPage({
              permissions: user.permissions,
              path,
              role: user.role,
            })
          ) {
            return (
              <QueryErrorResetBoundary>
                {({ reset }) => (
                  <ErrorBoundary
                    onError={(err) => console.log(err)}
                    FallbackComponent={ErrorBoundaryComponent}
                    onReset={reset}
                  >
                    <Component storeId={user?.store.id} />{" "}
                  </ErrorBoundary>
                )}
              </QueryErrorResetBoundary>
            );
            // User Don't have permissions
          } else return <NotAuthorized />;
        } else {
          // No Token or Broken Token
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
