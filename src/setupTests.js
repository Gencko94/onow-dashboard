// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import "jest-styled-components";

import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createMemoryHistory } from "history";
import { MemoryRouter, Router } from "react-router";
import matchMediaPolyfill from "mq-polyfill";
import "./testServer";
// polyfill for match media not available in JSDOM
matchMediaPolyfill(window);

global.renderWithClient = () => {
  const queryClient = new QueryClient();
  return ({ children }) => (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MemoryRouter>
  );
};

global.renderWithRouter = (renderComponent, route) => {
  const history = createMemoryHistory();
  if (route) {
    history.push(route);
  }
  return {
    ...render(<Router history={history}>{renderComponent()}</Router>),
    history,
  };
};
// implementation of window.resizeTo for dispatching event
window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event("resize"));
};
