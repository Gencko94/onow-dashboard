import styled from 'styled-components';
import OrderClientInformation from './OrderClientInformation';
import OrderDelivery from './OrderDelivery';
import OrderStatus from './OrderStatus';

const OrderInfo = () => {
  return (
    <Container>
      {/* <h5 className="heading">Order Details</h5> */}
      <ContentContainer>
        <OrderClientInformation />
        <OrderDelivery />
        <OrderStatus />
      </ContentContainer>
    </Container>
  );
};

export default OrderInfo;
const Container = styled.div`
  padding: 0.75rem;
  h5.heading {
    margin-bottom: 1rem;
  }
`;
const ContentContainer = styled.div`
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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
