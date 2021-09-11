import styled from "styled-components";
import { paymentGateways } from "../../../data/paymentMethods";
import Box from "../../reusable/Box/Box";
import Grid from "../../StyledComponents/Grid";
import PaymentMethodCard from "./OnlinePayments/PaymentMethodCard";

const OnlinePayments = () => {
  return (
    <Box type="titled" boxTitle="Online Payment Gateways">
      <Grid columns="1fr" gap="1.5rem">
        {paymentGateways.map((method) => {
          return <PaymentMethodCard key={method.logo} gateway={method} />;
        })}
      </Grid>
    </Box>
  );
};

export default OnlinePayments;
