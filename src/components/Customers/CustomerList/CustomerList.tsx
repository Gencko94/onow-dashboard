import { useMemo } from "react";
import styled from "styled-components";
import { CUSTOMER } from "../../../interfaces/customers/customers";
import EmptyTable from "../../reusable/EmptyTable";
import TableHead from "../../reusable/TableHead";
import CustomerItem from "./CustomerItem/CustomerItem";

interface IProps {
  data: CUSTOMER[];
}
const CustomerList = ({ data }: IProps) => {
  const cols = useMemo(
    () => [
      { title: "customerName", sortable: true },
      { title: "customerPhone", sortable: true },
      { title: "customerEmail", sortable: true },
      { title: "actions", sortable: false },
    ],
    []
  );
  return (
    <Container>
      <TableHead cols={cols} gridCols="1fr 1fr 1fr 0.5fr" />
      {data.length === 0 && (
        <EmptyTable height="300px" text="No Customers were Added " />
      )}
      {data.map((customer) => (
        <CustomerItem key={customer.id} customer={customer} />
      ))}
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
