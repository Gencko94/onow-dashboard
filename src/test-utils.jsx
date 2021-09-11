import React, { Suspense } from "react";
import { render } from "@testing-library/react";
import ThemeProvider from "./contexts/ThemeContext";
import { MemoryRouter } from "react-router";
import AuthContext from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import Loading from "./utils/Loading";

const AllTheProviders = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <MemoryRouter>
      {/* <Suspense fallback={<Loading />}> */}
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          {/* <AuthContext>  */}
          {children}
          {/* </AuthContext>  */}
        </ThemeProvider>
      </QueryClientProvider>
      {/* </Suspense> */}
    </MemoryRouter>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
