import styled from 'styled-components';
import OrderClientInformation from './OrderClientInformation';
import OrderDelivery from './OrderDelivery';
import OrderInfo from './OrderInfo';

const OrderBody = () => {
  return (
    <Container>
      <h4 className="heading">Order #58954</h4>
      <BoxesContainer>
        <OrderInfo />
        <OrderClientInformation />
        <OrderDelivery />
      </BoxesContainer>
      <hr />
    </Container>
  );
};

export default OrderBody;
const Container = styled.div`
  padding: 0.75rem;
  .heading {
    margin-bottom: 1rem;
  }
`;
const BoxesContainer = styled.div`
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Icon = styled.div`
  background: ${props => props.color};
  box-shadow: ${props => props.theme.shadow};
  border-radius: 5px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;
