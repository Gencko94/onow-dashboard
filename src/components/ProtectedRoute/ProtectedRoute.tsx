import { Redirect, Route } from "react-router-dom";

import { useContext } from "react";
import { AuthProvider } from "../../contexts/AuthContext";
import { QueryErrorResetBoundary } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import canVisitPage from "../../utils/canVisitPage";
import NotAuthorized from "../../pages/NotAuthorized";

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
                    fallbackRender={({ error, resetErrorBoundary }) => (
                      <div>
                        Something went wrong , please try again
                        <button onClick={() => resetErrorBoundary()}>
                          Try again
                        </button>
                        <pre style={{ whiteSpace: "normal" }}>
                          {error.message}
                        </pre>
                      </div>
                    )}
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
