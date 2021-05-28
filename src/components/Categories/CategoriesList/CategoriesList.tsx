import { useMemo } from "react";
import styled from "styled-components";
import TableHead from "../../reusable/TableHead";
import CategoryItem from "./CategoryItem";

const CategoriesList = () => {
  const cols = useMemo(
    () => [
      { title: "", sortable: false },
      { title: "name", sortable: false },
      { title: "image", sortable: false },
      { title: "numberOfProducts", sortable: false },
      { title: "status", sortable: false },
      { title: "actions", sortable: false },
    ],
    []
  );
  return (
    <Container>
      <TableHead cols={cols} gridCols="100px 1fr 1fr 1fr 1fr 1fr " />

      <div>
        {[0, 1, 2, 3].map((i) => (
          <CategoryItem />
        ))}
      </div>
    </Container>
  );
};

export default CategoriesList;
const Container = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: ${(props) => props.theme.border};
  box-shadow: ${(props) => props.theme.shadow};
`;