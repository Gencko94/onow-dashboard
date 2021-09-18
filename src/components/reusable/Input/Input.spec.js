import { render, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { MdMail } from "react-icons/md";
import ThemeProvider from "../../../contexts/ThemeContext";
import Input from "./Input";

describe("Input Component", () => {
  it("Should Render Input Component with label ", () => {
    const { getByLabelText } = render(
      <ThemeProvider>
        <Input label="Test Label" name="test" />
      </ThemeProvider>
    );
    expect(getByLabelText("Test Label")).toBeInTheDocument();
    expect(getByLabelText("Test Label")).toHaveAttribute("name", "test");
  });
  it("Should Render adornments ", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Input startAdornment={<MdMail />} endAdornment={<MdMail />} />
      </ThemeProvider>
    );
    expect(getByTestId("start-adornment")).toBeInTheDocument();
    expect(getByTestId("end-adornment")).toBeInTheDocument();
  });

  it("Should Render descriptive messages ", () => {
    const { getByText } = render(
      <ThemeProvider>
        <Input desc="Description here" />
      </ThemeProvider>
    );
    expect(getByText("Description here")).toBeInTheDocument();
  });
  it("Should have a default value ", () => {
    const { getByRole } = render(
      <ThemeProvider>
        <Input defaultValue="Default" />
      </ThemeProvider>
    );
    expect(getByRole("textbox")).toHaveValue("Default");
  });
  it("Should show error message when there is an error, and removes the error when resolved ", async () => {
    const FormErrorTest = () => {
      const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm();
      return (
        <ThemeProvider>
          <form onSubmit={handleSubmit(() => {})}>
            <Input
              defaultValue="Default"
              errors={errors}
              {...register("name", { required: "Required" })}
            />
            <button type="submit">Submit</button>
          </form>
        </ThemeProvider>
      );
    };
    const { getByRole, getByText, queryByRole, getByTestId } = render(
      <FormErrorTest />
    );
    const input = getByRole("textbox");
    const button = getByRole("button");
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.submit(button);
    await waitFor(() => {
      expect(getByText("Required")).toBeInTheDocument();
      expect(getByTestId("input-wrapper")).toHaveStyleRule(
        "border",
        "1px solid #b72b2b"
      );
    });
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.submit(button);
    await waitFor(() => {
      expect(queryByRole("alert")).not.toBeInTheDocument();
      expect(getByTestId("input-wrapper")).toHaveStyleRule(
        "border",
        "1px solid rgba(0,0,0,0.1)"
      );
    });
  });
});
