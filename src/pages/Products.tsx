import { createContext, useState } from "react";

import ProductsTable from "../components/Products/ProductsTable/ProductsTable";
import ProductsPanel from "../components/Products/ProductsPanel/ProductsPanel";
import LoadingTable from "../components/reusable/LoadingTable";
import { useGetProducts } from "../hooks/data-hooks/products/useGetProducts";
import { PRODUCTS_VIEW } from "../interfaces/products/products";
import EmptyTable from "../components/reusable/EmptyTable";
import { useTranslation } from "react-i18next";
import { Column } from "react-table";

type PRODUCTS_CONTEXT_PROPS = {
  view: PRODUCTS_VIEW;
  handleViewChange: (view: PRODUCTS_VIEW) => void;
};
export const ProductsProvider = createContext<Partial<PRODUCTS_CONTEXT_PROPS>>({
  view: "list",
});
const Products = () => {
  const [view, setView] = useState<PRODUCTS_VIEW>("list");
  const handleViewChange = (view: PRODUCTS_VIEW) => {
    setView(view);
  };
  const { data, status, isFetching, isLoading } = useGetProducts();

  return (
    <>
      <ProductsPanel />
      {status === "loading" ? (
        <LoadingTable />
      ) : status === "success" && data.length > 0 ? (
        <ProductsTable data={data} />
      ) : (
        ""
      )}
      {status === "success" && data.length === 0 && (
        <EmptyTable text="No Products Found" height="200px" />
      )}
    </>
  );
};

export default Products;
