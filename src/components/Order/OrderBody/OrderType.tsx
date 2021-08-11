import styled from "styled-components";
import { GridWrapper } from "../../StyledComponents/Grid";
import OrderDelivery from "./OrderDelivery";

interface IProps {
  orderType: string;
}

const OrderType = ({ orderType }: IProps) => {
  return (
    <Container>
      <div className="title-container">
        <h6 className="title">Order Type </h6>
      </div>
      <div className="content">
        <OrderDelivery />
      </div>
    </Container>
  );
};

export default OrderType;
const Container = styled.div`
  .title-container {
    padding: 1rem 0;
    color: ${(props) => props.theme.primary};
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: ${(props) => props.theme.font.xbold};
  }
  .title {
    font-size: 1.2rem;
  }
  .content {
    background-color: #fff;
    box-shadow: ${(props) => props.theme.shadow};
    overflow: hidden;
    border-radius: 6px;
    background-color: #fff;
    p.label {
      color: ${(props) => props.theme.textAlt};
      font-size: 0.9rem;
    }
    p.value {
      font-size: 0.9rem;
      margin: 0 0.25rem;
      font-weight: ${(props) => props.theme.font.semibold};
    }
  }
`;
