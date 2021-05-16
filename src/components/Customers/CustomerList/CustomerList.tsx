import { useMemo } from "react";
import styled from "styled-components";
import TableHead from "../../reusable/TableHead";
import CustomerItem from "./CustomerItem/CustomerItem";

const CustomerList = () => {
  const cols = useMemo(
    () => [
      { title: " ", sortable: false },
      { title: "customerName", sortable: true },
      { title: "customerPhone", sortable: true },
      { title: "customerEmail", sortable: true },
      { title: "actions", sortable: false },
    ],
    []
  );
  return (
    <Container>
      <TableHead cols={cols} gridCols="50px 1fr 1fr 1fr 0.5fr" />

      <div>
        {[0, 1, 2, 3].map((i) => (
          <CustomerItem />
        ))}
      </div>
    </Container>
  );
};

export default CustomerList;

const Container = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: ${(props) => props.theme.border};
  box-shadow: ${(props) => props.theme.shadow};
`;
