import { renderHook, act } from "@testing-library/react-hooks";
import { useDeleteProduct } from "../useDeleteProduct";
import {
  queryHooksWrapper,
  render,
  simulateMouseClick,
} from "../../../../test-utils";
import { waitFor } from "@testing-library/react";
describe("useDeleteProduct", () => {
  it("handleDeleteProduct works", async () => {
    const { result, waitFor } = renderHook(useDeleteProduct, {
      wrapper: queryHooksWrapper,
    });
    act(() => {
      result.current.handleDeleteProduct(1);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });
  it("handleDeleteProduct fails", async () => {
    const { result, waitFor } = renderHook(useDeleteProduct, {
      wrapper: queryHooksWrapper,
    });
    act(() => {
      result.current.handleDeleteProduct("fail");
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(false);
    });
  });
});
describe("Toast", () => {
  const ToastTest = ({ param }) => {
    const { handleDeleteProduct } = useDeleteProduct();
    return (
      <button
        data-testid="delete-btn"
        onClick={() => handleDeleteProduct(param)}
      >
        delete
      </button>
    );
  };
  it("shows success toast ", async () => {
    const { getByTestId } = render(<ToastTest param={1} />);

    simulateMouseClick(getByTestId("delete-btn"));

    await waitFor(() => {
      expect(getByTestId("toast")).toBeInTheDocument();
      expect(getByTestId("toast-text")).toHaveTextContent(
        "Product Deleted Successfully"
      );
    });
  });
  it("shows failure toast ", async () => {
    const { getByTestId } = render(<ToastTest param="fail" />);

    simulateMouseClick(getByTestId("delete-btn"));

    await waitFor(() => {
      expect(getByTestId("toast")).toBeInTheDocument();
      expect(getByTestId("toast-text")).toHaveTextContent(
        "Something went wrong"
      );
    });
  });
});
