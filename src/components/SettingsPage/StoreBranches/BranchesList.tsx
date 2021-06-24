import { useMemo } from "react";
import styled from "styled-components";
import TableHead from "../../reusable/TableHead";
import BranchItem from "./BranchItem";

const BranchesList = () => {
  const cols = useMemo(
    () => [
      { title: "branchName", sortable: false },
      { title: "location", sortable: false },
      { title: "enabled", sortable: false },
      { title: "actions", sortable: false },
    ],
    []
  );
  return (
    <Container>
      <TableHead cols={cols} />

      <div>
        {[0, 1, 2, 3].map((i) => (
          <BranchItem />
        ))}
      </div>
    </Container>
  );
};

export default BranchesList;
const Container = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: ${(props) => props.theme.border};
  box-shadow: ${(props) => props.theme.shadow};
  margin: 2rem 0;
`;
