import { BsFlag } from "react-icons/bs";
import { CgHashtag } from "react-icons/cg";
import { FiCalendar } from "react-icons/fi";
import styled from "styled-components";
import OrderClientInformation from "./OrderClientInformation";
import OrderDelivery from "./OrderDelivery";
import OrderInfo from "./OrderInfo";

const OrderBody = () => {
  return (
    <Container>
      <BoxesContainer>
        <div className="infos-container">
          <OrderInfo />
          <OrderDelivery />
        </div>
        <OrderClientInformation />
        <OrderSummary>
          <div className="box">
            <p className="label">
              <CgHashtag />
              <p>Order No</p>
            </p>
            <p className="value">5684324</p>
          </div>
          <div className="box">
            <p className="label">
              <FiCalendar /> <p>Order Date</p>
            </p>
            <p className="value">25/65/546</p>
          </div>
          <div className="box">
            <p className="label">
              <BsFlag /> <p>Order Status</p>
            </p>
            <p className="value">25/65/546</p>
          </div>
        </OrderSummary>
      </BoxesContainer>
      <hr />
    </Container>
  );
};

export default OrderBody;
const Container = styled.div``;
const BoxesContainer = styled.div`
  border-radius: 6px;
  display: grid;
  grid-template-columns: 1fr 0.3fr 0.3fr;
  gap: 1rem;
  margin: 1rem 0;
  .infos-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const OrderSummary = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  .box {
    background-color: #fff;
    box-shadow: ${(props) => props.theme.shadow};
    border-radius: 6px;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 1.1rem;
      font-weight: ${(props) => props.theme.font.semibold};
      color: ${(props) => props.theme.mainColor};
      p {
        margin: 0 0.5rem;
      }
    }
    .value {
      font-weight: ${(props) => props.theme.font.semibold};
      font-size: 1.7rem;
      text-align: center;
      color: ${(props) => props.theme.subHeading};
    }
  }
`;
