import styled from 'styled-components';
import { orderItems } from '../../../interfaces/orders/orders';
import SingleOrderItem from './SingleOrderItem';

const SingleOrderItemsList = () => {
  return (
    <Container>
      <h4 className="heading">Order Items</h4>
      <Table>
        <div className="head">
          <div className="col span">
            <h6>Item Name</h6>
          </div>
          <div className="col">
            <h6>Quantity</h6>
          </div>
          <div className="col">
            <h6>Price</h6>
          </div>
          <div className="col">
            <h6>Total</h6>
          </div>
        </div>
        <div className="body">
          {orderItems.map(item => (
            <SingleOrderItem key={item.id} item={item} />
          ))}
          <OrderSummary>
            <div className="row">
              <div className="empty"></div>
              <div className="col span">
                <p>Items Subtotal</p>
              </div>
              <div className="col">
                <p>8</p>
              </div>
            </div>
            <div className="row">
              <div className="empty"></div>
              <div className="col span">
                <p>Delivery Cost</p>
              </div>
              <div className="col">
                <p>2</p>
              </div>
            </div>
            <div className="row">
              <div className="col empty"></div>
              <div className="col span total">
                <p>Total</p>
              </div>
              <div className="col">
                <p className="total">10</p>
              </div>
            </div>
          </OrderSummary>
        </div>
      </Table>
    </Container>
  );
};

export default SingleOrderItemsList;
const Container = styled.div`
  padding: 0.75rem;
  .heading {
    margin-bottom: 1rem;
  }
`;
const Table = styled.div`
  box-shadow: ${props => props.theme.shadow};
  border-radius: 8px;
  border: ${props => props.theme.border};
  .head {
    border-bottom: ${props => props.theme.border};
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    .col {
      text-align: center;
      padding: 0.5rem;
    }
    .span {
      grid-column: 1/5;
    }
  }
`;
const OrderSummary = styled.div`
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }
  .col {
    text-align: center;
    padding: 0.5rem;
    border-bottom: ${props => props.theme.border};
    p {
      font-weight: ${props => props.theme.font.semibold};
    }
    .total {
      font-weight: ${props => props.theme.font.bold};
      font-size: 1.1rem;
      border: none;
    }
  }
  .empty {
    grid-column: 1/4;
  }
  .span {
    grid-column: 4/7;
  }
`;
