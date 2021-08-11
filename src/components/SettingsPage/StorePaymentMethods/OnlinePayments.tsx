import styled from "styled-components";
import { paymentGateways } from "../../../data/paymentMethods";
import Grid, { GridWrapper } from "../../StyledComponents/Grid";
import PaymentMethodCard from "./OnlinePayments/PaymentMethodCard";

const OnlinePayments = () => {
  return (
    <Container>
      <div className="title-container">
        <h5>Online Payment gateways</h5>
      </div>
      <Grid cols="1fr" gap="1.5rem">
        {paymentGateways.map((method) => {
          return <PaymentMethodCard key={method.logo} gateway={method} />;
        })}
      </Grid>
    </Container>
  );
};

export default OnlinePayments;

const Container = styled.div`
  .title-container {
    color: ${(props) => props.theme.primary};
    padding: 1rem 0;
  }
  ${GridWrapper} {
    padding: 1rem 0;
  }
`;
