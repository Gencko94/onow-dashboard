import styled from "styled-components";
import { ORDER } from "../../../interfaces/orders/orders";
import Grid from "../../StyledComponents/Grid";
import OrderItems from "../OrderItems/OrderItems";
import OrderClientInformation from "./OrderClientInformation";
import OrderDelivery from "./OrderDelivery";
import OrderInfo from "./OrderInfo";
import OrderNotes from "./OrderNotes";
import OrderPayment from "./OrderPayment";
import OrderSummary from "./OrderSummary";
import OrderType from "./OrderType";

interface IProps {
  data: ORDER;
}

const OrderBody = ({ data }: IProps) => {
  return (
    <Container>
      <OrderInfo
        orderStatus={data.order_status}
        orderId={data.order_id}
        date={data.created_at}
      />

      <OrderItems amount={data!.amount} />
      <Grid columns="1fr 1fr" gap="0.5rem">
        <OrderSummary />
        <OrderNotes />
      </Grid>
      {/* <OrderType orderType={data.order_type} /> */}
    </Container>
  );
};

export default OrderBody;
const Container = styled.div`
  box-shadow: ${(props) => props.theme.shadow};
  background-color: #fff;
  border-radius: 6px;
`;
