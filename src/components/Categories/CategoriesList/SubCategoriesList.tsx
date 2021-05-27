import { useMemo } from "react";
import styled from "styled-components";
import TableHead from "../../reusable/TableHead";

import SubCategoryItem from "./SubCategoryItem";

const SubCategoriesList = () => {
  return (
    <Container>
      <h6 className="title">Sub Categories</h6>

      <div className="table">
        {[0, 1, 2, 3].map((i) => (
          <SubCategoryItem />
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
    padding: 1rem;
  }
  .table {
    padding: 0 1rem 1rem 1rem;
  }
`;
