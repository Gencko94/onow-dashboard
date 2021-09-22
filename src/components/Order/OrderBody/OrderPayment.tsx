import styled from "styled-components";

import PaymentStatusChip from "../../reusable/PaymentStatusChip";
import Grid from "../../StyledComponents/Grid";
import { PAYMENT_STATUS } from "../../../interfaces/orders/orders";

interface IProps {
  paymentStatus: PAYMENT_STATUS;
  paymentType: string;
}

const OrderPayment = ({ paymentStatus, paymentType }: IProps) => {
  return (
    <Container>
      <div className="title-container">
        <h6 className="title">Order Payment </h6>
      </div>
      <div className="content">
        <Grid items="center" padding="0.75rem" columns="auto 1fr" gap="0.25rem">
          <p className="label">Payment Type : </p>
          <p className="value">Visa</p>
        </Grid>
        <Grid items="center" padding="0.75rem" columns="auto 1fr" gap="0.25rem">
          <p className="label">Payment Status </p>
          <PaymentStatusChip
            dots
            status={{
              id: 2,
              title: {
                en: "Paid",
                ar: "مدفوع",
              },
            }}
          />
        </Grid>
      </div>
    </Container>
  );
};

export default OrderPayment;
const Container = styled.div`
  padding: 1rem;
  .title-container {
    color: ${(props) => props.theme.primary};
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
    justify-content: space-between;
  }
  .content {
    background-color: #fff;
    box-shadow: ${(props) => props.theme.shadow};
    border-radius: 6px;
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
