import styled from 'styled-components';
import DashboardOrder from './DashboardOrder';

const DashboardOrders = () => {
  return (
    <Container>
      <Title>Latest Orders</Title>
      <OrdersContainer>
        <DashboardOrder />
        <DashboardOrder />
        <DashboardOrder />
      </OrdersContainer>
    </Container>
  );
};

export default DashboardOrders;
const Container = styled.div`
  box-shadow: ${props => props.theme.shadow};
  border-radius: 8px;
  background-color: ${props => props.theme.boxColor};
  padding: 0.75rem;
  align-self: start;
  /* width: 300px; */
  /* display: flex; */
  /* align-items: center; */
`;
const Title = styled.h5(
  ({ theme: { breakpoints, headingColor, font } }) => `
  font-weight:${font.xbold};
  padding:0 0.5rem;
  `
);
const OrdersContainer = styled.div`
  padding: 0.75rem 0;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 0.25rem;
`;
