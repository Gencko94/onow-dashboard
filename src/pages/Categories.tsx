import styled from "styled-components";
import CategoriesList from "../components/Categories/CategoriesList/CategoriesList";
import CategoriesPanel from "../components/Categories/CategoriesPanel";
import SvgLogo from "../components/SvgLogo/SvgLogo";

const Categories = () => {
  return (
    <div>
      <CategoriesPanel />
      <CategoriesList />
    </div>
  );
};

export default Categories;
