import styled from "styled-components";
import OrderBody from "../components/Order/OrderBody/OrderBody";
import SingleOrderItemsList from "../components/Order/OrderItems/SingleOrderItemsList";
import OrderPanel from "../components/Order/OrderPanel/OrderPanel";
import Breadcrumbs from "../components/reusable/Breadcrumbs";

const Order = () => {
  return (
    <Container>
      <Breadcrumbs
        parentLabel="Orders"
        childLabel="Order"
        parentTarget="/orders"
      />
      <OrderPanel />
      <hr />
      <OrderBody />
      <SingleOrderItemsList />
    </Container>
  );
};

export default Order;
const Container = styled.div`
  padding: 0.75rem;
`;
