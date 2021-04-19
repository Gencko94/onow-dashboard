import styled from 'styled-components';
import OrderBody from '../components/Order/OrderBody/OrderBody';
import SingleOrderItemsList from '../components/Order/OrderItems/SingleOrderItemsList';
import OrderPanel from '../components/Order/OrderPanel/OrderPanel';

const Order = () => {
  return (
    <Container>
      <OrderPanel />
      <hr />
      <OrderBody />
      <SingleOrderItemsList />
    </Container>
  );
};

export default Order;
const Container = styled.div`
  padding: 0.75rem;
`;
