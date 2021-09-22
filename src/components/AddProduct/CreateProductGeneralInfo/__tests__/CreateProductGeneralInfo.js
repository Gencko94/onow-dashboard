import { fireEvent, waitFor } from "@testing-library/react";
import { useGetCategories } from "../../../../hooks/data-hooks/categories/useGetCategories";
import {
  render,
  renderWithoutLayout,
  simulateMouseClick,
} from "../../../../test-utils";
import CreateProductGeneralInfo from "../CreateProductGeneralInfo";
import { fakeCategory } from "../../../../fakeData/fakeData";
import { NewProductContext } from "../../../../contexts/Product/NewProductContext";

jest.mock("../../../../hooks/data-hooks/categories/useGetCategories", () => ({
  useGetCategories: jest.fn(),
}));
const ContextWrapper = ({ children, providerProps }) => {
  return (
    <NewProductContext.Provider value={providerProps}>
      {children}
    </NewProductContext.Provider>
  );
};
describe("Create Product general info -- first step", () => {
  beforeEach(() => {
    useGetCategories.mockImplementation(() => ({ data: [fakeCategory] }));
  });
  it("Should not allow to go to the next step if nothing was entered", async () => {
    const updateData = jest.fn();
    const setActiveTab = jest.fn();

    const { getByTestId, getAllByRole } = renderWithoutLayout(
      <ContextWrapper
        providerProps={{ updateData, setActiveTab, formData: {} }}
      >
        <CreateProductGeneralInfo />
      </ContextWrapper>
    );
    const nextBtn = getByTestId("pgi-n");

    fireEvent.submit(nextBtn);
    await waitFor(() => {
      expect(getAllByRole("alert")).toHaveLength(6);
      expect(updateData).not.toBeCalled();
      expect(setActiveTab).not.toBeCalled();
    });
  });
  it("When Inputs are filled correctly , calls updateData with correct data and calls setActiveTab to 1", async () => {
    const updateData = jest.fn();
    const setActiveTab = jest.fn();
    const { getByTestId, debug } = renderWithoutLayout(
      <ContextWrapper
        providerProps={{ updateData, setActiveTab, formData: {} }}
      >
        <CreateProductGeneralInfo />
      </ContextWrapper>
    );
    const nextBtn = getByTestId("pgi-n");

    // expect();
    fireEvent.input(getByTestId("name.en"), { target: { value: "name en" } });
    fireEvent.input(getByTestId("name.ar"), { target: { value: "name ar" } });
    fireEvent.input(getByTestId("sku"), { target: { value: "sku" } });
    fireEvent.input(getByTestId("description.en"), {
      target: { value: "description english" },
    });
    fireEvent.input(getByTestId("description.ar"), {
      target: { value: "description arabic" },
    });

    debug();
    simulateMouseClick(getByTestId("category-1-row"));
    fireEvent.submit(nextBtn);
    await waitFor(() => {
      expect(updateData).toBeCalledWith({
        name: { en: "name en", ar: "name ar" },
        description: { en: "description english", ar: "description arabic" },
        sku: "sku",
        quantity: "unlimited",
        slug: "name-en",
        category_id: [1],
      });
      expect(setActiveTab).toBeCalledWith(1);
    });
  });
});
