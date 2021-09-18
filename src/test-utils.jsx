import { render, screen } from "@testing-library/react";
import ThemeProvider from "./contexts/ThemeContext";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "react-query";
import { renderIntoDocument } from "react-dom/test-utils";
import Layout from "./layout/Layout";
import ApplicationContext from "./contexts/ApplicationContext";
import { fireEvent } from "@testing-library/react";
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
export function simulateMouseClick(element) {
  fireEvent.pointerDown(element, { pointerType: "mouse" });
  fireEvent.mouseDown(element);
  fireEvent.pointerUp(element, { pointerType: "mouse" });
  fireEvent.mouseUp(element);
  fireEvent.click(element);
}
export function simulateEnterKeyClick(element, opts) {
  let { fireClick } = opts || {};
  fireEvent.keyDown(element, { key: "Enter" });
  fireEvent.keyUp(element, { key: "Enter" });
  if (fireClick) {
    fireEvent.click(element);
  }
}
export function simulateSpaceKeyClick(element, opts) {
  let { fireClick } = opts || {};
  fireEvent.keyDown(element, { key: " " });
  fireEvent.keyUp(element, { key: " " });
  if (fireClick) {
    fireEvent.click(element);
  }
}
export async function wait(time) {
  return await new Promise((res) => setTimeout(res, time));
}
export function debug(limit = 300000) {
  screen.debug(undefined, limit);
}
export const queryHooksWrapper = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
