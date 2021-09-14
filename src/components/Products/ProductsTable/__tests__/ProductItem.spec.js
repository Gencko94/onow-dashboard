import { fakeProduct } from "../../../../fakeData/fakeData";
import { useActivateProduct } from "../../../../hooks/data-hooks/products/useActivateProduct";
import { fireEvent, screen } from "@testing-library/react";
import { render } from "../../../../test-utils";
import ProductItem from "../ProductItem";

jest.mock("../../../../hooks/data-hooks/products/useActivateProduct", () => ({
  useActivateProduct: jest.fn(),
}));

describe("<ProductItem/>", () => {
  const handleActivateProduct = jest.fn();
  beforeEach(() => {
    useActivateProduct.mockImplementation(() => ({
      handleActivateProduct,
    }));
    render(
      <ProductItem
        product={fakeProduct}
        selectedRows={[]}
        handleToggleRows={() => {}}
      />
    );
  });

  it("Shows correct data", () => {
    expect(screen.getByTestId("product-id")).toHaveTextContent("1");
  });
  it("Toggles Product Activation", () => {
    fireEvent.click(screen.getByTestId("toggler"));
    expect(handleActivateProduct).toBeCalled();
  });
});
