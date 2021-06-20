import styled from "styled-components";
import { orderItems } from "../../../interfaces/orders/orders";
import SingleOrderItem from "./SingleOrderItem";

interface IProps {
  amount: string;
}

const OrderItems = ({ amount }: IProps) => {
  return (
    <Container>
      <div className="title-container">
        <h5>Order Items (2)</h5>
      </div>

      <Table>
        <div className="head">
          <div className="col span">
            <p>Item Name</p>
          </div>

          <div className="qty">
            <p>Price </p>
            <span>X</span>
            <p>Quantity </p>
          </div>
          <div className="total">
            <p>Total</p>
          </div>
        </div>
        <div className="body">
          {orderItems.map((item) => (
            <SingleOrderItem key={item.id} item={item} />
          ))}
        </div>
      </Table>
    </Container>
  );
};

export default OrderItems;
const Container = styled.div`
  padding: 1rem;
  .title-container {
    padding: 1rem 0;

    h5 {
      font-size: 1rem;
    }
  }
`;
const Table = styled.div`
  background-color: #fff;

  border-radius: 6px;
  border: ${(props) => props.theme.border};
  .head {
    font-weight: ${(props) => props.theme.font.bold};
    padding: 1rem;
    font-size: 0.9rem;
    border-bottom: ${(props) => props.theme.border};
    display: grid;
    grid-template-columns: 300px 200px 1fr;
    gap: 1rem;
    p {
    }
    .qty {
      text-align: center;

      display: grid;
      grid-template-columns: 1fr 1fr 1fr;

      gap: 0.5rem;
    }
    .total {
      justify-self: flex-end;
    }
  }
`;
