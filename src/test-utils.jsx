import React, { Suspense } from "react";
import { render } from "@testing-library/react";
import ThemeProvider from "./contexts/ThemeContext";
import { MemoryRouter } from "react-router";
import AuthContext from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import Loading from "./utils/Loading";
import { renderIntoDocument } from "react-dom/test-utils";
import Layout from "./layout/Layout";
import ApplicationContext from "./contexts/ApplicationContext";

const AllTheProviders = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <MemoryRouter>
      {/* <Suspense fallback={<Loading />}> */}
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ApplicationContext>
            <Layout>{children}</Layout>
          </ApplicationContext>
        </ThemeProvider>
      </QueryClientProvider>
      {/* </Suspense> */}
    </MemoryRouter>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });
const customRenderIntoDocument = (ui, options) =>
  renderIntoDocument(<AllTheProviders>{ui}</AllTheProviders>);

// re-export everything
export * from "@testing-library/react";

// override render method
export {
  customRender as render,
  customRenderIntoDocument as renderIntoDocument,
};
