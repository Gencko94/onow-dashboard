import { renderHook, act } from "@testing-library/react-hooks";
import {
  queryHooksWrapper,
  render,
  simulateMouseClick,
} from "../../../../test-utils";
import { waitFor } from "@testing-library/react";
import { useDeleteCategory } from "../useDeleteCategory";
describe("useDeleteCategory", () => {
  it("handleDeleteCategory works", async () => {
    const { result, waitFor } = renderHook(useDeleteCategory, {
      wrapper: queryHooksWrapper,
    });
    act(() => {
      result.current.handleDeleteCategory(1);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });
  it("handleDeleteCategory fails", async () => {
    const { result, waitFor } = renderHook(useDeleteCategory, {
      wrapper: queryHooksWrapper,
    });
    act(() => {
      result.current.handleDeleteCategory("fail");
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(false);
    });
  });
});
describe("Toast", () => {
  const ToastTest = ({ param }) => {
    const { handleDeleteCategory } = useDeleteCategory();
    return (
      <button
        data-testid="delete-btn"
        onClick={() => handleDeleteCategory(param)}
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
        "Category Deleted Successfully"
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
