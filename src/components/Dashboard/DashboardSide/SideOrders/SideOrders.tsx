import styled from 'styled-components';
import SideOrder from './SideOrder';

const SideOrders = () => {
  return (
    <Container>
      <Title>Latest Orders</Title>
      <OrdersContainer>
        <SideOrder />
        <SideOrder />
        <SideOrder />
      </OrdersContainer>
    </Container>
  );
};

export default SideOrders;
const Container = styled.div`
  box-shadow: ${props => props.theme.shadow};
  border-radius: 8px;
  background-color: ${props => props.theme.boxColor};
  padding: 0.75rem;
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
