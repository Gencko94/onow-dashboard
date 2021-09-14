import { screen } from "@testing-library/react";
import { useHistory } from "react-router";
import { fakeProduct } from "../../../../fakeData/fakeData";
import { useDeleteProduct } from "../../../../hooks/data-hooks/products/useDeleteProduct";
import {
  render,
  renderIntoDocument,
  simulateEnterKeyClick,
  simulateMouseClick,
  simulateSpaceKeyClick,
} from "../../../../test-utils";
import ProductsTable from "../ProductsTable";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useHistory: jest.fn(),
}));
jest.mock("../../../../hooks/data-hooks/products/useDeleteProduct", () => ({
  useDeleteProduct: jest.fn(),
}));

describe("<ProductsTable/>", () => {
  const handleDeleteProduct = jest.fn();
  beforeEach(() => {
    useDeleteProduct.mockImplementation(() => ({ handleDeleteProduct }));
  });
  it("Shows correct data", () => {
    render(<ProductsTable data={[{ ...fakeProduct }]} />);
    expect(screen.getByTestId("product-id")).toHaveTextContent("1");
  });
  it.only("Deletes single product with correct id", async () => {
    render(<ProductsTable data={[{ ...fakeProduct }]} />);

    simulateMouseClick(screen.getByTestId("menu-toggle"));
    expect(screen.getByTestId("product-delete-button")).toBeVisible();

    simulateMouseClick(screen.getByTestId("product-delete-button"));

    expect(screen.getByTestId("confirmation-modal")).toBeInTheDocument();

    simulateMouseClick(screen.getByTestId("confirmation-modal-confirm-btn"));
    expect(handleDeleteProduct).toBeCalledWith(1);
  });
  it("Instructs router to push to the correct product id", () => {
    const push = jest.fn();
    useHistory.mockImplementation(() => ({ push }));
    render(<ProductsTable data={[{ ...fakeProduct }]} />);
    simulateMouseClick(screen.getByTestId("product-edit-button"));
    expect(push).toBeCalledWith("/products/1");
  });
});
