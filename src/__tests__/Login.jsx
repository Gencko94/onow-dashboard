/* eslint-disable no-throw-literal */
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { useLogin } from "../hooks/data-hooks/useLogin";
import Login from "../pages/Login";
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
    render(<Login />);
  });
  it("should display requried error when inputs are empty", async () => {
    fireEvent.submit(screen.getByTestId("login-btn"));
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(await screen.findAllByRole("alert")).toHaveLength(2);
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
  it("Submits the form correctly and shows loading spinner", async () => {
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
      expect(screen.getByTestId("btn-loading")).toBeInTheDocument();
    });
  });
});
describe("Login Server Error messages", () => {
  // Needs improvments, should mock the entire ```onSubmit``` function in order to seperate server responses from the actual test.
  it("If Credentials are invalid, show error messages", async () => {
    const mutateAsync = jest.fn(() => {
      throw {
        response: { data: { error: "INVALID_CREDENTIALS" } },
      };
    });

    useLogin.mockImplementation(() => ({ mutateAsync }));
    render(<Login />);
    fireEvent.input(screen.getByTestId("email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /login/i }));
    await waitFor(() => {
      expect(screen.getAllByRole("alert")).toHaveLength(2);
      expect(mutateAsync).toBeCalled();
    });
  });
});
