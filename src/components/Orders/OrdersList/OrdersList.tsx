import styled from 'styled-components';
import { ORDER } from '../../../interfaces/orders/orders';
import ExportAs from '../../reusable/ExportAs';
import OrderItem from './OrderItem';
interface IProps {
  orders: ORDER[];
}
const OrdersList = ({ orders }: IProps) => {
  return (
    <Container>
      <div className="title-container">
        <h5>Orders List</h5>
        <ExportAs />
      </div>
      <TableContainer>
        <GridHead>
          <div className="field">
            <h6>Order ID</h6>
          </div>
          <div className="field">
            <h6>Customer Name</h6>
          </div>
          <div className="field">
            <h6>Order Type</h6>
          </div>

          <div className="field">
            <h6>Order Status</h6>
          </div>
          <div className="field">
            <h6>Order Date</h6>
          </div>
          <div className="field">
            <h6>Actions</h6>
          </div>
        </GridHead>
        <div>
          {orders.map(order => (
            <OrderItem order={order} key={order.order_id} />
          ))}
        </div>
      </TableContainer>
    </Container>
  );
};

export default OrdersList;
const Container = styled.div`
  .title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
  }
`;
const TableContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: ${props => props.theme.border};
  box-shadow: ${props => props.theme.shadow};
`;

const GridHead = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 1fr 1fr 0.5fr;
  background-color: ${props => props.theme.overlayColor};
  border-bottom: ${props => props.theme.border};
  gap: 1rem;
  /* padding: 0 0.5rem; */
  .field {
    padding: 1rem;
    text-align: center;
    h6 {
      font-size: 0.8rem;
      color: ${props => props.theme.headingColor};
      font-weight: ${props => props.theme.font.semibold};
    }
  }
`;
