import CategoriesList from "../components/Categories/CategoriesList/CategoriesList";
import CategoriesPanel from "../components/Categories/CategoriesPanel";
import CategoriesTable from "../components/Categories/CategoriesTable/CategoriesTable";
import EmptyTable from "../components/reusable/EmptyTable";
import LoadingTable from "../components/reusable/LoadingTable";
import { useGetCategories } from "../hooks/data-hooks/categories/useGetCategories";

const Categories = () => {
  const { data, status } = useGetCategories();
  return (
    <>
      <CategoriesPanel />
      {status === "loading" ? (
        <LoadingTable />
      ) : status === "success" && data && data.length > 0 ? (
        <CategoriesTable data={data} />
      ) : (
        ""
      )}
      {status === "success" && data && data.length === 0 && (
        <EmptyTable text="No Categories Found" height="200px" />
      )}
      <CategoriesList />
    </>
  );
};

export default Categories;
