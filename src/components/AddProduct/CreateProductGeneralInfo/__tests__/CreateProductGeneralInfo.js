import { fireEvent, waitFor } from "@testing-library/react";
import { render, simulateMouseClick } from "../../../../test-utils";
import CreateProductGeneralInfo from "../CreateProductGeneralInfo";

describe("<CreateProductGeneralInfo>", () => {
  it("Should not allow to go to the next step if nothing was entered", async () => {
    const { getByTestId, getAllByRole, debug } = render(
      <CreateProductGeneralInfo />
    );
    const nextBtn = getByTestId("pgi-n");
    // const inputs = getAllByRole("textbox");
    // console.log(inputs.length, "inputs length");

    fireEvent.submit(nextBtn);
    await waitFor(() => {
      // debug();
      expect(getAllByRole("alert")).toHaveLength(7);
    });
  });
});
