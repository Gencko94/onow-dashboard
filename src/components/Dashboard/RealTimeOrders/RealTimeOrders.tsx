import { useMemo } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { NEW_ORDERS } from "../../../interfaces/orders/new-orders";
import { getNewOrders } from "../../../utils/test-queries";
import OrderItem from "../../Orders/OrdersList/OrderItem";
import TableHead from "../../reusable/TableHead/TableHead";

const RealTimeOrders = () => {
  const cols = useMemo(
    () => [
      { title: "id", sortable: false },
      {
        title: "customerName",
        sortable: false,
      },
      {
        title: "orderType",
        sortable: false,
      },
      {
        title: "paymentType",
        sortable: false,
      },
      {
        title: "paymentStatus",
        sortable: false,
      },
      {
        title: "orderStatus",
        sortable: false,
      },
      {
        title: "orderDate",
        sortable: false,
      },
      {
        title: "actions",
        sortable: false,
      },
    ],
    []
  );
  const { data } = useQuery<NEW_ORDERS>("new-orders", getNewOrders);
  return (
    <Container>
      <div className="title-container">
        <h5>Real Time Orders</h5>
      </div>
      <TableContainer>
        <TableHead
          cols={cols}
          gridCols="0.25fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr"
        />

        <div>
          {data?.orders.map((order) => (
            <OrderItem order={order} key={order.order_id} />
          ))}
        </div>
      </TableContainer>
    </Container>
  );
};

export default RealTimeOrders;
const Container = styled.div`
  .title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    color: ${(props) => props.theme.primary};
  }
`;
const TableContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: ${(props) => props.theme.border};
  box-shadow: ${(props) => props.theme.shadow};
`;
