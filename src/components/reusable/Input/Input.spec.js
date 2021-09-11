import { render } from "@testing-library/react";
import { MdMail } from "react-icons/md";
import ThemeProvider from "../../../contexts/ThemeContext";
import Input from "./Input";

describe("Input Component", () => {
  it("Should Render Input Component with label ", () => {
    const { getByLabelText } = render(
      <ThemeProvider>
        <Input label="Test Label" id="test" />
      </ThemeProvider>
    );
    expect(getByLabelText("Test Label")).toBeInTheDocument();
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
});
