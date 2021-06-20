import { Redirect, Route } from "react-router-dom";

import { useContext } from "react";
import { AuthProvider } from "../../contexts/AuthContext";
import { QueryErrorResetBoundary } from "react-query";
import { ErrorBoundary } from "react-error-boundary";

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
