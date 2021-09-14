import { screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useHistory } from "react-router";
import { fakeProduct } from "../../../../fakeData/fakeData";
import { useDeleteProduct } from "../../../../hooks/data-hooks/products/useDeleteProduct";
import useConfirmationModal from "../../../../hooks/useConfirmationModal";
import { render, renderIntoDocument } from "../../../../test-utils";
import ProductsTable from "../ProductsTable";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useHistory: jest.fn(),
}));
jest.mock("../../../../hooks/data-hooks/products/useDeleteProduct", () => ({
  useDeleteProduct: jest.fn(),
}));
jest.mock("../../../../hooks/useConfirmationModal");
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
    const handleCloseConfirmationModal = jest.fn();
    const setConfirmationModalStatus = jest.fn();
    useConfirmationModal.mockImplementation(() => ({
      handleCloseConfirmationModal,
      setConfirmationModalStatus,
      confirmationModalStatus: {
        open: true,
        closeCb: handleCloseConfirmationModal,
        successCb: () => {},
        desc: "description",
        title: "Modal Title",
      },
    }));
    render(<ProductsTable data={[{ ...fakeProduct }]} />);

    fireEvent.mouseDown(screen.getByTestId("menu-toggle"));
    fireEvent.click(screen.getByTestId("product-delete-button"));
    expect(setConfirmationModalStatus).toBeCalled();
    // await waitFor(() => {
    // expect(
    //   screen.getByTestId("confirmation-modal-confirm")
    // ).toBeInTheDocument();
    // });
    // userEvent.click(await screen.findByTestId("confirmation-modal-confirm"));
    // expect(handleDeleteProduct).toBeCalledWith("1");
  });
  it("Instructs router to push to the correct product id", () => {
    const push = jest.fn();
    useHistory.mockImplementation(() => ({ push }));
    render(<ProductsTable data={[{ ...fakeProduct }]} />);
    fireEvent.click(screen.getByTestId("product-edit-button"));
    expect(push).toBeCalledWith("/products/1");
  });
});
