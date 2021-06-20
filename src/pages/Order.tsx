import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import OrderBody from "../components/Order/OrderBody/OrderBody";
import SingleOrderItemsList from "../components/Order/OrderItems/OrderItems";
import OrderPanel from "../components/Order/OrderPanel/OrderPanel";
import OrderSide from "../components/Order/OrderSide/OrderSide";
import Breadcrumbs from "../components/reusable/Breadcrumbs";
import Grid, { GridWrapper } from "../components/StyledComponents/Grid";
import { getOrder } from "../utils/queries";

const Order = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery(["order", id], () => getOrder(id), {
    suspense: true,
  });
  return (
    <>
      <Container>
        <Grid cols="1fr 0.5fr" gap="1rem">
          <Breadcrumbs
            parentLabel="Orders"
            childLabel="Order"
            parentTarget="/orders"
          />
          <OrderPanel />
        </Grid>
      </Container>
      <hr />
      <OrderContainer>
        <OrderBody data={data!} />
        <OrderSide data={data!} />
      </OrderContainer>
    </>
  );
};

export default Order;
const Container = styled.div`
  margin-bottom: 1rem;
  ${GridWrapper} {
    box-shadow: ${(props) => props.theme.shadow};
    border-radius: 6px;
  }
`;
const OrderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  gap: 0.5rem;
`;
