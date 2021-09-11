import styled from "styled-components";
import Grid from "../../StyledComponents/Grid";

const OrderDelivery = () => {
  return (
    <Container>
      <Grid items="center" padding="0.75rem" columns="auto 1fr" gap="0.25rem">
        <p className="label">City : </p>
        <p className="value">Hawalli</p>
      </Grid>
      <Grid items="center" padding="0.75rem" columns="auto 1fr" gap="0.25rem">
        <p className="label">Address : </p>
        <p className="value">56St</p>
      </Grid>
    </Container>
  );
};

export default OrderDelivery;
const Container = styled.div`
  p.label {
    color: ${(props) => props.theme.textAlt};
    font-size: 0.9rem;
  }
  p.value {
    font-size: 0.9rem;
    margin: 0 0.25rem;
    font-weight: ${(props) => props.theme.font.semibold};
  }
`;
