import styled from 'styled-components';
import CustomerProfileOrderItem from './CustomerProfileOrderItem';

const CustomerProfileOrders = () => {
  return (
    <Container>
      <h5>Customer Orders</h5>
      <GridHead>
        <div className="field">
          <span />
        </div>
        <div className="field">
          <h6>Order Number</h6>
        </div>
        <div className="field">
          <h6>Order Date</h6>
        </div>
        <div className="field">
          <h6>Order Amount</h6>
        </div>
        <div className="field">
          <h6>Status</h6>
        </div>
      </GridHead>
      <div>
        {[0, 1, 2, 3].map(i => (
          <CustomerProfileOrderItem />
        ))}
      </div>
    </Container>
  );
};

export default CustomerProfileOrders;
const Container = styled.div`
  padding: 0.75rem;
  h5 {
    margin-bottom: 1rem;
  }
`;
const GridHead = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 1fr 1fr 0.5fr;
  background-color: ${props => props.theme.overlayColor};
  border-bottom: ${props => props.theme.border};
  gap: 1rem;

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
