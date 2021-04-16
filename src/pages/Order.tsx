import styled from 'styled-components';
import OrderInfo from '../components/Order/OrderInfo/OrderInfo';
import OrderPanel from '../components/Order/OrderPanel/OrderPanel';

const Order = () => {
  return (
    <Container>
      <OrderPanel />
      <hr />
      <OrderInfo />
    </Container>
  );
};

export default Order;
const Container = styled.div`
  padding: 0.75rem;
`;
