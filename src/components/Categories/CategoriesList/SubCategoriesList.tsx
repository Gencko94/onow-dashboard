import styled from "styled-components";
import { CATEGORY } from "../../../interfaces/categories/categories";

import SubCategoryItem from "./SubCategoryItem";
interface IProps {
  selectedRows: number[];
  handleToggleRows: (rowId: number) => void;
  categories: CATEGORY[];
  handleDeleteCategory: (id: number) => void;
}
const SubCategoriesList = ({
  categories,
  handleToggleRows,
  selectedRows,
  handleDeleteCategory,
}: IProps) => {
  return (
    <Container>
      <h6 className="title">Sub Categories</h6>

      <div className="sub-table">
        {categories.map((category) => (
          <SubCategoryItem
            key={category.id}
            category={category}
            handleToggleRows={handleToggleRows}
            selectedRows={selectedRows}
            handleDeleteCategory={handleDeleteCategory}
          />
        ))}
      </div>
    </Container>
  );
};

export default SubCategoriesList;
const Container = styled.div`
  /* border-radius: 8px; */
  overflow: hidden;
  border: ${(props) => props.theme.border};
  box-shadow: ${(props) => props.theme.shadow};
  background-color: #dbdbdb;
  /* padding-bottom: 2rem; */
  .title {
    padding: 0.75rem;
  }
  .sub-table {
    border-radius: 6px;
    overflow: hidden;
    padding: 0 0.75rem 0.75rem 0.75rem;
  }
`;
