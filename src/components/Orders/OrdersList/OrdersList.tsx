import styled from 'styled-components';
import OrderItem from './OrderItem';

const OrdersList = () => {
  return (
    <Container>
      <GridHead>
        <div className="field">
          <span />
        </div>
        <div className="field">
          <h6>Order ID</h6>
        </div>
        <div className="field">
          <h6>Customer Name</h6>
        </div>
        <div className="field">
          <h6>Delivery Location</h6>
        </div>
        <div className="field">
          <h6>Order Status</h6>
        </div>
        <div className="field">
          <h6>Actions</h6>
        </div>
      </GridHead>
      <div>
        {[0, 1, 2, 3].map(i => (
          <OrderItem />
        ))}
      </div>
    </Container>
  );
};

export default OrdersList;
const Container = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: ${props => props.theme.border};
  box-shadow: ${props => props.theme.shadow};
`;

const GridHead = styled.div`
  display: grid;
  grid-template-columns: 50px 0.5fr 1fr 1fr 1fr 0.5fr;
  background-color: ${props => props.theme.overlayColor};
  border-bottom: ${props => props.theme.border};
  gap: 1rem;
  /* padding: 0 0.5rem; */
  .field {
    padding: 1rem;
    text-align: center;
    h6 {
      font-size: 0.8rem;
      color: ${props => props.theme.subHeading};
      font-weight: ${props => props.theme.font.semibold};
    }
  }
`;
