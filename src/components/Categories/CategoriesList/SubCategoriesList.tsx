import styled from "styled-components";

import SubCategoryItem from "./SubCategoryItem";
interface IProps {
  selectedRows: number[];
  handleToggleRows: (rowId: number) => void;
}
const SubCategoriesList = ({ handleToggleRows, selectedRows }: IProps) => {
  return (
    <Container>
      <h6 className="title">Sub Categories</h6>

      <div className="sub-table">
        {[0, 1, 2, 3].map((i) => (
          <SubCategoryItem
            handleToggleRows={handleToggleRows}
            selectedRows={selectedRows}
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
