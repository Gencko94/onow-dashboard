import styled from "styled-components";

const OrderSummary = () => {
  return (
    <Container>
      <div className="title-container">
        <h5>Order Summary</h5>
      </div>
      <div className="table">
        <div className="field">
          <p>Order Items Total</p>
          <p>365 KD</p>
        </div>
        <div className="field">
          <p>Delivery Fee</p>
          <p>Free</p>
        </div>
        <div className="field">
          <p>Cash on Delivery fee</p>
          <p>Free</p>
        </div>
        <div className="field last">
          <p>Subtotal</p>
          <p>365 KD</p>
        </div>
      </div>
    </Container>
  );
};

export default OrderSummary;
const Container = styled.div`
  padding: 1rem;
  .title-container {
    padding: 1rem 0;

    h5 {
      font-size: 1rem;
    }
  }
  .table {
    border: ${(props) => props.theme.border};
    border-radius: 6px;
    font-size: 0.9rem;
    .field {
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: ${(props) => props.theme.border};
    }
    .last {
      color: ${(props) => props.theme.mainColor};
      font-weight: ${(props) => props.theme.font.bold};
      border-bottom: none;
    }
  }
`;
