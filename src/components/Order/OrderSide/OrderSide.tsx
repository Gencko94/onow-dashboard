import styled from "styled-components";
import { ORDER } from "../../../interfaces/orders/orders";
import Hr from "../../StyledComponents/Hr";
import OrderClientInformation from "../OrderBody/OrderClientInformation";
import OrderPayment from "../OrderBody/OrderPayment";
interface IProps {
  data: ORDER;
}
const OrderSide = ({ data }: IProps) => {
  return (
    <Container>
      <OrderClientInformation customer={data.order_customer} />
      <Hr m="0.25rem" />
      <OrderPayment
        paymentStatus={data.payment_status}
        paymentType={data.payment_type}
      />
    </Container>
  );
};

export default OrderSide;
const Container = styled.div`
  background-color: ${(props) => props.theme.subtleBackground};
  box-shadow: ${(props) => props.theme.shadow};
  border: ${(props) => props.theme.border};

  border-radius: 6px;
`;
