import styled from 'styled-components';

const DashboardOrders = () => {
  return (
    <Container>
      <Orderer>Ahmad Zaaza</Orderer>
      <OrderAmount>$235</OrderAmount>
      <OrderPaymentType>K-net</OrderPaymentType>
      <OrderStatus>Delivered</OrderStatus>
    </Container>
  );
};

export default DashboardOrders;
const Container = styled.div`
  border-radius: 8px;
  cursor: pointer;
  background-color: ${props => props.theme.boxColor};
  padding: 0.5rem 0.75rem;
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  gap: 0.5rem;
  row-gap: 0.12rem;
  &:hover {
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  }
`;
const Orderer = styled.p(
  ({ theme: { breakpoints, headingColor, font } }) => `
  font-weight:${font.semibold};
  font-size:0.8rem;
  `
);
const OrderAmount = styled.p(
  ({ theme: { breakpoints, headingColor, font } }) => `
    font-weight:${font.bold};
    font-size:0.9rem;
    color:#03c59b;
  `
);
const OrderPaymentType = styled.p(
  ({ theme: { breakpoints, subHeading, font } }) => `
    font-weight:${font.semibold};
    font-size:0.7rem;
    color:${subHeading};
  `
);
const OrderStatus = styled.p(
  ({ theme: { breakpoints, headingColor, font } }) => `
    font-weight:${font.semibold};
    font-size:0.7rem;
    color:#03c59b;
  `
);
