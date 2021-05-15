import { useQuery } from "react-query";
import styled from "styled-components";
import { NEW_ORDERS } from "../../../interfaces/orders/new-orders";
import { getNewOrders } from "../../../utils/test-queries";
import OrderItem from "../../Orders/OrdersList/OrderItem";
import ExportAs from "../../reusable/ExportAs";

const DashboardOrders = () => {
  const { data, isLoading } = useQuery<NEW_ORDERS>("new-orders", getNewOrders);
  return (
    <Container>
      <div className="title-container">
        <h5>New Orders</h5>
      </div>
      <TableContainer>
        <GridHead>
          <div className="field">
            <h6>ID</h6>
          </div>
          <div className="field">
            <h6>Customer Name</h6>
          </div>
          <div className="field">
            <h6>Order Type</h6>
          </div>
          <div className="field">
            <h6>Payment Type</h6>
          </div>
          <div className="field">
            <h6>Payment Status</h6>
          </div>

          <div className="field">
            <h6>Order Status</h6>
          </div>
          <div className="field">
            <h6>Order Date</h6>
          </div>
          <div className="field">
            <h6>Actions</h6>
          </div>
        </GridHead>
        <div>
          {data?.orders.map((order) => (
            <OrderItem order={order} key={order.order_id} />
          ))}
        </div>
      </TableContainer>
    </Container>
  );
};

export default DashboardOrders;
const Container = styled.div`
  /* background-color: #fff; */
  /* border-radius: 6px; */
  .title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    /* font-weight: ${(props) => props.theme.font.xbold}; */
  }
`;
const TableContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: ${(props) => props.theme.border};
  box-shadow: ${(props) => props.theme.shadow};
`;

const GridHead = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr;
  background-color: ${(props) => props.theme.overlayColor};
  border-bottom: ${(props) => props.theme.border};
  gap: 1rem;
  .field {
    padding: 1rem 0.5rem;
    text-align: center;
    h6 {
      font-size: 0.9rem;
      color: ${(props) => props.theme.headingColor};
      font-weight: ${(props) => props.theme.font.semibold};
      text-align: center;
    }
  }
`;
