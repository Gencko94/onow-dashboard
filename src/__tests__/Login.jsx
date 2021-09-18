/* eslint-disable no-throw-literal */
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { LoginForm } from "../components/Login/LoginForm";
import { useLogin } from "../hooks/data-hooks/useLogin";

import { render } from "../test-utils";

jest.mock("../hooks/data-hooks/useLogin", () => {
  return {
    useLogin: jest.fn(),
  };
});
describe("Form Submission", () => {
  const mutateAsync = jest.fn();
  beforeEach(() => {
    useLogin.mockImplementation(() => ({ mutateAsync }));
    render(<LoginForm />);
  });
  it("should display requried error when inputs are empty", async () => {
    fireEvent.submit(screen.getByTestId("login-btn"));
    expect(screen.getByText("Email")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getAllByRole("alert")).toHaveLength(2);
    });
    expect(mutateAsync).not.toBeCalled();
    expect(screen.queryByTestId("btn-loading")).not.toBeInTheDocument();
  });

  it("Should display matching error when email is not valid", async () => {
    fireEvent.input(screen.getByTestId("email"), {
      target: { value: "test" },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });
    fireEvent.submit(screen.getByTestId("login-btn"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mutateAsync).not.toBeCalled();
    expect(screen.queryByTestId("btn-loading")).not.toBeInTheDocument();
  });
});

describe("Submitting", () => {
  const mutateAsync = jest.fn();

  beforeEach(() => {
    useLogin.mockImplementation(() => ({ mutateAsync }));
    render(<LoginForm />);
  });
  it("mutateAsync gets called with correct data", async () => {
    fireEvent.input(screen.getByTestId("email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /login/i }));

    expect(screen.queryAllByRole("alert")).toHaveLength(0);

    await waitFor(() => {
      expect(mutateAsync).toBeCalledWith({
        login: "test@test.com",
        password: "password",
      });
    });
  });
});

describe("Login Server Error messages", () => {
  jest.mock("../hooks/data-hooks/useLogin", () => {
    return {
      ...jest.requireActual("../hooks/data-hooks/useLogin"),
      useLogin: jest.fn(),
    };
  });
  it("If Credentials are invalid, show error messages", async () => {
    const mutateAsync = jest.fn().mockImplementation(() => {
      throw {
        response: { data: { error: "INVALID_CREDENTIALS" } },
      };
    });

    useLogin.mockImplementation(() => ({ mutateAsync }));
    render(<LoginForm />);
    fireEvent.input(screen.getByTestId("email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /login/i }));
    await waitFor(() => {
      expect(mutateAsync).toBeCalledWith({
        login: "test@test.com",
        password: "password",
      });
      expect(mutateAsync).toThrowError();
      expect(screen.getAllByRole("alert")).toHaveLength(2);
    });
  });
});
