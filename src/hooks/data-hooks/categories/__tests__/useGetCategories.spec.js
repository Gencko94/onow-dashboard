import { renderHook } from "@testing-library/react-hooks";
import { queryHooksWrapper } from "../../../../test-utils";
import { useGetCategories } from "../useGetCategories";
describe("useGetCategories", () => {
  it.only("calls getCategories", async () => {
    const { result, waitFor } = renderHook(() => useGetCategories(), {
      wrapper: queryHooksWrapper,
    });

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual([]);
      expect(result.current.isLoading).toBe(false);
    });
  });
});
