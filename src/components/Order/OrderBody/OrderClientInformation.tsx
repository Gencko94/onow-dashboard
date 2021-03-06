import styled from "styled-components";

import Grid from "../../StyledComponents/Grid";
import { ORDER_CUSTOMER } from "../../../interfaces/orders/orders";

interface IProps {
  customer: ORDER_CUSTOMER;
}

const OrderClientInformation = ({ customer }: IProps) => {
  return (
    <Container>
      <div className="title-container">
        <h6 className="title">Order Customer </h6>
      </div>
      <div className="content">
        <Grid items="center" padding="0.75rem" columns="auto 1fr" gap="0.25rem">
          <p className="label">Customer Name : </p>
          <p className="value">
            {customer.first_name} {customer.last_name}
          </p>
        </Grid>
        <Grid items="center" padding="0.75rem" columns="auto 1fr" gap="0.25rem">
          <p className="label">Customer Phone Number : </p>
          <p className="value">{customer.phone_number}</p>
        </Grid>
      </div>
    </Container>
  );
};

export default OrderClientInformation;
const Container = styled.div`
  padding: 1rem;
  .title-container {
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme.primary};
  }

  .content {
    background: #fff;

    border-radius: 6px;
    border: ${(props) => props.theme.border};
    overflow: hidden;
    p.label {
      color: ${(props) => props.theme.textAlt};
      font-size: 0.9rem;
    }
    p.value {
      font-size: 0.9rem;
      margin: 0 0.25rem;
      font-weight: ${(props) => props.theme.font.semibold};
    }
  }
`;
