import { screen } from "@testing-library/react";
import { useHistory } from "react-router";
import { useDeleteCategory } from "../../../../hooks/data-hooks/categories/useDeleteCategory";
import { render, simulateMouseClick } from "../../../../test-utils";
import CategoriesTable from "../CategoriesTable";
const fakeCategory = {
  id: 1,
  image: "/images/product.webp",
  name: {
    ar: "المنظفات",
    en: "Detergants",
  },
  slug: "/clothes",
  active: true,
  parent_id: null,
  description: {
    ar: "مساحيق الغسيل",
    en: "Washing Powders",
  },
  children: [
    {
      active: true,
      parent_id: 1,
      id: 9,
      image: "/images/product.webp",
      name: {
        ar: "مساحيق الغسيل",
        en: "Washing Powders",
      },
      description: {
        ar: "مساحيق الغسيل",
        en: "Washing Powders",
      },
      slug: "/clothes",
      children: [],
    },
  ],
};
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useHistory: jest.fn(),
}));

jest.mock("../../../../hooks/data-hooks/categories/useDeleteCategory", () => ({
  useDeleteCategory: jest.fn(),
}));
describe("<CategoriesTable/>", () => {
  const handleDeleteCategory = jest.fn();
  beforeEach(() => {
    useDeleteCategory.mockImplementation(() => ({ handleDeleteCategory }));
  });
  it("Shows correct data", () => {
    render(<CategoriesTable data={[{ ...fakeCategory }]} />);
    expect(screen.getByTestId("category-id")).toHaveTextContent("1");
  });
  it("Deletes single product with correct id", async () => {
    render(<CategoriesTable data={[{ ...fakeCategory }]} />);

    simulateMouseClick(screen.getByTestId("menu-toggle"));
    expect(screen.getByTestId("category-delete-button")).toBeVisible();

    simulateMouseClick(screen.getByTestId("category-delete-button"));

    expect(screen.getByTestId("confirmation-modal")).toBeInTheDocument();

    simulateMouseClick(screen.getByTestId("confirmation-modal-confirm-btn"));
    expect(handleDeleteCategory).toHaveBeenCalledTimes(1);
  });

  it("Instructs router to push to the correct category id", () => {
    const push = jest.fn();
    useHistory.mockImplementation(() => ({ push }));
    render(<CategoriesTable data={[{ ...fakeCategory }]} />);
    simulateMouseClick(screen.getByTestId("category-edit-button"));
    expect(push).toBeCalledWith("/categories/1");
  });
});
describe("", () => {});
