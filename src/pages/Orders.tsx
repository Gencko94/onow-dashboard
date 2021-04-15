import styled from 'styled-components';
import OrdersList from '../components/Orders/OrdersList/OrdersList';
import OrdersPanel from '../components/Orders/OrdersPanel/OrdersPanel';
import OrdersThumbnails from '../components/Orders/OrdersThumbnails/OrdersThumbnails';

const Orders = () => {
  return (
    <Container>
      <OrdersPanel />
      <hr />
      <OrdersThumbnails />
      <hr />
      <OrdersList />
    </Container>
  );
};

export default Orders;
const Container = styled.div`
  padding: 0.75rem;
`;
